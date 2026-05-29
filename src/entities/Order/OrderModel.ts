import { MobXRepository } from '@/repository/MobXRepository';
import { IOrder } from './IOrder';
import { IOrderMeta } from './IOrderMeta';

export interface IOrderModel {
    isGuest: boolean | null;
    orders: IOrder[];
    current: IOrder | null;
    meta: IOrderMeta | null;
}

class OrderModel implements IOrderModel {
    private isGuestRepository = new MobXRepository<boolean | null>(null);
    private ordersRepository = new MobXRepository<IOrder[]>([]);
    private currentRepository = new MobXRepository<IOrder | null>(null);
    private metaRepository = new MobXRepository<IOrderMeta | null>(null);

    public get isGuest() {
        return this.isGuestRepository.data || null;
    }

    public set isGuest(orders: boolean | null) {
        this.isGuestRepository.save(orders);
    }

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
        var isFindElement: boolean = false;
        const newOrders: IOrder[] = this.orders.map<IOrder>((e) => {
            if (order != null && e.id === order!.id) {
                isFindElement = true;
                return order!;
            } else {
                return e;
            }
        })
        if (isFindElement) {
            this.orders = [
                ...newOrders,
            ];
        } else {
            if (order != null) {
                this.orders = [
                    order,
                    ...this.orders
                ];
            }
        }
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
        this.isGuest = null;
        this.meta = null;
        this.current = null;
        this.orders = [];
    }
}

export const orderModel = new OrderModel();
