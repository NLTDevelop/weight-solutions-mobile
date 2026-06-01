import { MobXRepository } from '@/repository/MobXRepository'; 
import { IOrder } from '../Order/IOrder';

export interface IOrderToSyncModel {
    ordersToSync: IOrder[];
    addOrdersToSync(order: IOrder): void;
    updateOrdersToSync(order: IOrder): void;
    removeOrdersToSync(orderId: string): void;
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
        return this.ordersToSync.push(order);
    }

    public updateOrdersToSync(order: IOrder) {
        const index = this.ordersToSync.findIndex((o) => o.id === order.id);
        if (index !== -1) {
            this.ordersToSync[index] = order;
        }
    }

    public removeOrdersToSync(orderId: number | string) {
        this.ordersToSync = this.ordersToSync.filter((o) => o.id !== orderId);
    }

}

export const orderToSyncModel = new OrderToSyncModel();
