import { MobXRepository } from '@/repository/MobXRepository';
import { IOrder } from './IOrder';
import { IOrderMeta } from './IOrderMeta';
import { OrderListDtoStatusEnum } from './enums/OrderListDtoStatusEnum';

export interface IOrderModel {
    isGuest: boolean | null;
    ordersActive: IOrder[];
    ordersArchived: IOrder[];
    current: IOrder | null;
    metaActive: IOrderMeta | null;
    metaArchived: IOrderMeta | null;
}

const getOrderListStatus = (order: IOrder | null) => {
    return order?.status?.toLowerCase?.() === OrderListDtoStatusEnum.ACTIVE
        ? OrderListDtoStatusEnum.ACTIVE
        : OrderListDtoStatusEnum.ARCHIVE;
};

class OrderModel implements IOrderModel {
    private isGuestRepository = new MobXRepository<boolean | null>(null);
    private ordersActiveRepository = new MobXRepository<IOrder[]>([], 'ordersActive');
    private ordersArchivedRepository = new MobXRepository<IOrder[]>([], 'ordersArchived');
    private currentRepository = new MobXRepository<IOrder | null>(null);
    private metaActiveRepository = new MobXRepository<IOrderMeta | null>(null, 'metaActive');
    private metaArchivedRepository = new MobXRepository<IOrderMeta | null>(null, 'metaArchived');

    public get isGuest() {
        return this.isGuestRepository.data || null;
    }

    public set isGuest(orders: boolean | null) {
        this.isGuestRepository.save(orders);
    }

    public get ordersActive() {
        return this.ordersActiveRepository.data || [];
    }

    public set ordersActive(orders: IOrder[]) {
        this.ordersActiveRepository.save(orders);
    }

    public get ordersArchived() {
        return this.ordersArchivedRepository.data || [];
    }

    public set ordersArchived(orders: IOrder[]) {
        this.ordersArchivedRepository.save(orders);
    }

    public get current() {
        return this.currentRepository.data;
    }

    public set current(order: IOrder | null) {
        this.currentRepository.save(order);
        if (order === null) {
            return;
        }

        const nextStatus = getOrderListStatus(order);
        const targetOrders = nextStatus === OrderListDtoStatusEnum.ACTIVE ? this.ordersActive : this.ordersArchived;
        const nextOrders = [order, ...targetOrders.filter(item => item.id !== order.id)];

        this.ordersActive = this.ordersActive.filter(item => item.id !== order.id);
        this.ordersArchived = this.ordersArchived.filter(item => item.id !== order.id);

        if (nextStatus === OrderListDtoStatusEnum.ACTIVE) {
            this.ordersActive = nextOrders;
            return;
        }

        this.ordersArchived = nextOrders;
    }

    public get metaActive() {
        return this.metaActiveRepository.data;
    }

    public set metaActive(meta: IOrderMeta | null) {
        this.metaActiveRepository.save(meta);
    }

    public get metaArchived() {
        return this.metaArchivedRepository.data;
    }

    public set metaArchived(meta: IOrderMeta | null) {
        this.metaArchivedRepository.save(meta);
    }

    public setMeta(status: OrderListDtoStatusEnum, meta: IOrderMeta | null) {
        if (status === OrderListDtoStatusEnum.ACTIVE) {
            this.metaActive = meta;
            return;
        }

        this.metaArchived = meta;
    }

    public append(status: OrderListDtoStatusEnum, orders: IOrder[]) {
        if (status === OrderListDtoStatusEnum.ACTIVE) {
            this.ordersActive = [...this.ordersActive, ...orders];
            return;
        }

        this.ordersArchived = [...this.ordersArchived, ...orders];
    }

    public replace(status: OrderListDtoStatusEnum, orders: IOrder[]) {
        if (status === OrderListDtoStatusEnum.ACTIVE) {
            this.ordersActive = orders;
            return;
        }

        this.ordersArchived = orders;
    }

    public clean() {
        this.isGuest = null;
        this.metaActive = null;
        this.metaArchived = null;
        this.current = null;
        this.ordersActive = [];
        this.ordersArchived = [];
    }
}

export const orderModel = new OrderModel();
