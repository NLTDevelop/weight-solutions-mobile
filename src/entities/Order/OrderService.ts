import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { fetch as fetchNetInfo } from '@react-native-community/netinfo';
import { IOrder } from './IOrder';
import { IOrderMeta } from './IOrderMeta';
import { orderModel } from './OrderModel';
import { OrderCreateDto, OrderWeightItemDto } from './dto/order-create.dto';
import { OrderListDto } from './dto/order-list.dto';
import { OrderUpdateDto } from './dto/order-update.dto';
import { orderToSyncModel } from '../OrdersToSync/OrdersToSyncModel';
import { productModel } from '../Product/ProductModel';

interface IOrderListResponse {
    data: IOrder[];
    meta: IOrderMeta;
}

interface IOrderResponse {
    data: IOrder;
}

class OrderService {
    private syncPromise: Promise<void> | null = null;

    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    private isOnline = async () => {
        const state = await fetchNetInfo();
        return state.isConnected === true && state.isInternetReachable !== false;
    };

    private createRequest = async (body: OrderCreateDto): Promise<IResponse<IOrderResponse>> => {
        const response = await this.requester.request({
            url: this.links.orders,
            method: 'POST',
            data: body,
            withCredentials: true,
        });

        return response;
    };

    private detailsRequest = async (orderId: number): Promise<IResponse<IOrderResponse>> => {
        const response = await this.requester.request({
            url: this.links.orderDetails(orderId),
            method: 'GET',
            withCredentials: true,
        });

        return response;
    };

    private getOrdersByStatus = (status: OrderListDto['status']) => {
        return status === 'archive' ? orderModel.ordersArchived : orderModel.ordersActive;
    };

    private addItemRequest = async (orderId: number, body: OrderWeightItemDto): Promise<IResponse<IOrderResponse>> => {
        const response = await this.requester.request({
            url: this.links.orderAddItem(orderId),
            method: 'PUT',
            data: body,
            withCredentials: true,
        });

        return response;
    };

    private mergeOrdersWithPending = (orders: IOrder[], status: OrderListDto['status']) => {
        const pendingOrders = orderToSyncModel.ordersToSync.filter((order) => {
            const orderStatus = order.status?.toLowerCase?.() === 'active'
                ? status === 'active'
                : status === 'archive';

            return orderStatus;
        });

        const resolvedOrders = [...orders];

        pendingOrders.forEach((pendingOrder) => {
            const currentOrderIndex = resolvedOrders.findIndex((order) => order.id === pendingOrder.id || order.localId === pendingOrder.localId);

            if (currentOrderIndex === -1) {
                resolvedOrders.unshift(pendingOrder);
                return;
            }

            resolvedOrders[currentOrderIndex] = pendingOrder;
        });

        return resolvedOrders;
    };

    private getSyncedOrderStatus = (order: IOrder) => {
        const itemsCount = order.items?.length || 0;
        return itemsCount >= Math.max(order.weight_count || 0, 2) ? 'completed' : 'active';
    };

    private getNextLocalId = () => -(Date.now() + Math.floor(Math.random() * 1000));

    private buildOfflineOrder = (body: OrderCreateDto) => {
        const now = new Date().toISOString();
        const tempId = this.getNextLocalId();
        const selectedProduct = productModel.activeProducts?.data?.find((product) => product.id === body.product_id) || null;

        return {
            id: tempId,
            localId: tempId,
            car_phone: body.car_phone,
            car_number: body.car_number,
            created_at: now,
            updated_at: now,
            product: selectedProduct,
            type: body.type,
            weight_count: body.weight_count,
            is_guest: body.is_guest,
            items: [
                {
                    id: this.getNextLocalId(),
                    weight: body.item.weight,
                    weight_type: body.item.weight_type,
                    created_at: now,
                },
            ],
            status: 'active',
            comment: body.comment || null,
            isSyncedWithServer: false,
            pendingSyncAction: 'create' as const,
            pendingItemsToSync: null,
        } as IOrder;
    };

    private buildOfflineUpdatedOrder = (order: IOrder, body: OrderWeightItemDto) => {
        const nextItem = {
            id: this.getNextLocalId(),
            weight: body.weight,
            weight_type: body.weight_type,
            created_at: new Date().toISOString(),
        };

        const nextPendingItems = order.pendingSyncAction === 'create'
            ? order.pendingItemsToSync || null
            : [...(order.pendingItemsToSync || []), nextItem];

        const nextOrder: IOrder = {
            ...order,
            items: [...(order.items || []), nextItem],
            updated_at: nextItem.created_at,
            status: this.getSyncedOrderStatus({
                ...order,
                items: [...(order.items || []), nextItem],
            }),
            isSyncedWithServer: false,
            pendingSyncAction: order.pendingSyncAction === 'create' ? 'create' : 'addItem',
            pendingItemsToSync: nextPendingItems,
        };

        return nextOrder;
    };

    private queueOfflineOrder = (order: IOrder) => {
        orderToSyncModel.upsertOrderToSync(order);
        orderModel.current = order;
    };

    syncPendingOrders = async () => {
        if (this.syncPromise) {
            return this.syncPromise;
        }

        this.syncPromise = (async () => {
            const online = await this.isOnline();

            if (!online || orderToSyncModel.ordersToSync.length === 0) {
                return;
            }

            for (const pendingOrder of [...orderToSyncModel.ordersToSync]) {
                if (pendingOrder.pendingSyncAction === 'create') {
                    const firstItem = pendingOrder.items?.[0];

                    if (!firstItem || !pendingOrder.product?.id || !pendingOrder.type || !pendingOrder.weight_count) {
                        continue;
                    }

                    const createResponse = await this.createRequest({
                        car_phone: pendingOrder.car_phone || '',
                        car_number: pendingOrder.car_number,
                        product_id: pendingOrder.product.id,
                        type: pendingOrder.type,
                        weight_count: pendingOrder.weight_count,
                        is_guest: !!pendingOrder.is_guest,
                        comment: pendingOrder.comment || undefined,
                        item: {
                            weight: firstItem.weight,
                            weight_type: firstItem.weight_type,
                        },
                    });

                    if (createResponse.isError || !createResponse.data?.data) {
                        if (createResponse.type === 'NETWORK_ERROR') {
                            break;
                        }

                        continue;
                    }

                    let syncedOrder: IOrder = createResponse.data.data;
                    const remainingItems = pendingOrder.items?.slice(1) || [];

                    for (const item of remainingItems) {
                        const addItemResponse = await this.addItemRequest(syncedOrder.id, {
                            weight: item.weight,
                            weight_type: item.weight_type,
                        });

                        if (addItemResponse.isError || !addItemResponse.data?.data) {
                            if (addItemResponse.type === 'NETWORK_ERROR') {
                                return;
                            }

                            break;
                        }

                        syncedOrder = addItemResponse.data.data;
                    }

                    syncedOrder.localId = pendingOrder.id;
                    syncedOrder.isSyncedWithServer = true;
                    syncedOrder.pendingSyncAction = null;
                    syncedOrder.pendingItemsToSync = null;

                    orderModel.remove(pendingOrder.id);
                    orderToSyncModel.removeOrdersToSync(pendingOrder.id);
                    orderModel.current = syncedOrder;
                    continue;
                }

                if (pendingOrder.pendingSyncAction === 'addItem') {
                    const pendingItems = pendingOrder.pendingItemsToSync || [];
                    let syncedOrder: IOrder | null = null;
                    let hasNetworkError = false;

                    for (const item of pendingItems) {
                        const addItemResponse = await this.addItemRequest(pendingOrder.id, {
                            weight: item.weight,
                            weight_type: item.weight_type,
                        });

                        if (addItemResponse.isError || !addItemResponse.data?.data) {
                            hasNetworkError = addItemResponse.type === 'NETWORK_ERROR';
                            break;
                        }

                        syncedOrder = addItemResponse.data.data;
                    }

                    if (hasNetworkError) {
                        break;
                    }

                    if (!syncedOrder) {
                        continue;
                    }

                    syncedOrder.localId = pendingOrder.localId || null;
                    syncedOrder.isSyncedWithServer = true;
                    syncedOrder.pendingSyncAction = null;
                    syncedOrder.pendingItemsToSync = null;

                    orderToSyncModel.removeOrdersToSync(pendingOrder.id);
                    orderModel.current = syncedOrder;
                }
            }
        })().finally(() => {
            this.syncPromise = null;
        });

        return this.syncPromise;
    };

    list = async (params: OrderListDto): Promise<IResponse<IOrderListResponse>> => {
        try {
            await this.syncPendingOrders();

            const response = await this.requester.request({
                url: this.links.orders,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                const nextOrders = params.offset > 0
                    ? this.mergeOrdersWithPending([...this.getOrdersByStatus(params.status), ...response.data.data], params.status)
                    : this.mergeOrdersWithPending(response.data.data, params.status);
                const pendingLocalOnlyCount = nextOrders.filter((order) => order.id < 0).length;

                orderModel.replace(params.status, nextOrders);
                orderModel.setMeta(params.status, {
                    ...response.data.meta,
                    total: (response.data.meta?.total || 0) + pendingLocalOnlyCount,
                });
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: OrderCreateDto): Promise<IResponse<IOrderResponse>> => {
        try {
            const online = await this.isOnline();

            if (!online) {
                const localOrder = this.buildOfflineOrder(body);
                this.queueOfflineOrder(localOrder);

                return {
                    isError: false,
                    data: { data: localOrder },
                    message: '',
                    type: 'OFFLINE_QUEUED',
                };
            }

            const response = await this.createRequest(body);

            if (!response.isError && response.data?.data) {
                response.data.data.isSyncedWithServer = true;
                orderModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> create: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    details = async (orderId: number): Promise<IResponse<IOrderResponse>> => {
        try {
            const pendingOrder = orderToSyncModel.getOrderToSync(orderId) || orderModel.getById(orderId);

            if (pendingOrder && pendingOrder.isSyncedWithServer === false) {
                orderModel.current = pendingOrder;
                return {
                    isError: false,
                    data: { data: pendingOrder },
                    message: '',
                    type: 'OFFLINE_LOCAL',
                };
            }

            const resolvedOrderId = pendingOrder?.id && pendingOrder.id !== orderId ? pendingOrder.id : orderId;
            const response = await this.detailsRequest(resolvedOrderId);

            if (!response.isError && response.data?.data) {
                response.data.data.isSyncedWithServer = true;
                orderModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> details: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    update = async (orderId: number, body: OrderUpdateDto): Promise<IResponse<IOrderResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.orderDetails(orderId),
                method: 'PUT',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                orderModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> update: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    addItem = async (orderId: number, body: OrderWeightItemDto): Promise<IResponse<IOrderResponse>> => {
        try {
            const online = await this.isOnline();

            if (!online) {
                const currentOrder = orderToSyncModel.getOrderToSync(orderId) || orderModel.getById(orderId);

                if (!currentOrder) {
                    return { isError: true, data: null, message: 'Order not found', type: 'OFFLINE_ORDER_NOT_FOUND' } as any;
                }

                const localOrder = this.buildOfflineUpdatedOrder(currentOrder, body);
                this.queueOfflineOrder(localOrder);

                return {
                    isError: false,
                    data: { data: localOrder },
                    message: '',
                    type: 'OFFLINE_QUEUED',
                };
            }

            const response = await this.addItemRequest(orderId, body);

            if (!response.isError && response.data?.data) {
                response.data.data.isSyncedWithServer = true;
                orderModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> addItem: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };
}

export const orderService = new OrderService(appRequester, appLinks);
