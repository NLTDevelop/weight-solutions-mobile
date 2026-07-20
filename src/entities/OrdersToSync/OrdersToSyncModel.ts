import { MobXRepository } from '@/repository/MobXRepository'; 
import { IOrder } from '../Order/IOrder';

export interface IOrderToSyncModel {
    ordersToSync: IOrder[];
    addOrdersToSync(order: IOrder): void;
    updateOrdersToSync(order: IOrder): void;
    upsertOrderToSync(order: IOrder): void;
    getOrderToSync(orderId: number): IOrder | null;
    removeOrdersToSync(orderId: number): void;
}


class OrderToSyncModel implements IOrderToSyncModel {
    private ordersToSyncRepository = new MobXRepository<IOrder[]>([], 'ordersToSync');

    public get ordersToSync() {
        return this.ordersToSyncRepository.data || [];
    }

    public set ordersToSync(orders: IOrder[]) {
        this.ordersToSyncRepository.save(orders);
    }

    public addOrdersToSync(order: IOrder) {
        this.ordersToSync = [...this.ordersToSync, order];
    }

    public updateOrdersToSync(order: IOrder) {
        this.ordersToSync = this.ordersToSync.map((currentOrder) => {
            if (currentOrder.id === order.id || currentOrder.localId === order.id) {
                return order;
            }

            return currentOrder;
        });
    }

    public upsertOrderToSync(order: IOrder) {
        const currentOrder = this.getOrderToSync(order.id);

        if (currentOrder) {
            this.updateOrdersToSync(order);
            return;
        }

        this.addOrdersToSync(order);
    }

    public getOrderToSync(orderId: number) {
        return this.ordersToSync.find((order) => order.id === orderId || order.localId === orderId) || null;
    }

    public removeOrdersToSync(orderId: number) {
        this.ordersToSync = this.ordersToSync.filter((order) => order.id !== orderId && order.localId !== orderId);
    }

}

export const orderToSyncModel = new OrderToSyncModel();
