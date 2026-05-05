import { MobXRepository } from '@/repository/MobXRepository';
import { IOrder } from './IOrder';
import { IOrderMeta } from './IOrderMeta';

export interface IOrderModel {
    orders: IOrder[];
    current: IOrder | null;
    meta: IOrderMeta | null;
}

class OrderModel implements IOrderModel {
    private ordersRepository = new MobXRepository<IOrder[]>([]);
    private currentRepository = new MobXRepository<IOrder | null>(null);
    private metaRepository = new MobXRepository<IOrderMeta | null>(null);

    public get orders() {
        return this.ordersRepository.data || [];
    }

    public set orders(orders: IOrder[]) {
        this.ordersRepository.save(orders);
    }

    public get current() {
        return this.currentRepository.data;
    }

    public set current(order: IOrder | null) {
        this.currentRepository.save(order);
    }

    public get meta() {
        return this.metaRepository.data;
    }

    public set meta(meta: IOrderMeta | null) {
        this.metaRepository.save(meta);
    }

    public append(orders: IOrder[]) {
        this.orders = [...this.orders, ...orders];
    }

    public clean() {
        this.meta = null;
        this.current = null;
        this.orders = [];
    }
}

export const orderModel = new OrderModel();
