import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { IOrder } from './IOrder';
import { IOrderMeta } from './IOrderMeta';
import { orderModel } from './OrderModel';
import { OrderCreateDto, OrderWeightItemDto } from './dto/order-create.dto';
import { OrderListDto } from './dto/order-list.dto';
import { OrderUpdateDto } from './dto/order-update.dto';

interface IOrderListResponse {
    data: IOrder[];
    meta: IOrderMeta;
}

interface IOrderResponse {
    data: IOrder;
}

class OrderService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    list = async (params: OrderListDto): Promise<IResponse<IOrderListResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.orders,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                if (params.offset > 0) {
                    orderModel.append(params.status, response.data.data);
                } else {
                    orderModel.replace(params.status, response.data.data);
                }
                orderModel.setMeta(params.status, response.data.meta);
            }

            return response;
        } catch (error) {
            console.warn('OrderService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: OrderCreateDto): Promise<IResponse<IOrderResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.orders,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
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
            const response = await this.requester.request({
                url: this.links.orderDetails(orderId),
                method: 'GET',
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
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
            const response = await this.requester.request({
                url: this.links.orderAddItem(orderId),
                method: 'PUT',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
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
