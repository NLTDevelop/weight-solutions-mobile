import { MobXRepository } from '@/repository/MobXRepository';
import { INotification } from './INotification';
import { INotificationMeta } from './INotificationMeta';

export interface INotificationModel {
    notifications: INotification[];
    current: INotification | null;
    meta: INotificationMeta | null;
    message: string;
    append: (data: { data: INotification[], meta: INotificationMeta }) => void;
    clear: () => void;
}

class NotificationModel implements INotificationModel {
    private notificationsRepository = new MobXRepository<INotification[]>([]);
    private currentRepository = new MobXRepository<INotification | null>(null);
    private metaRepository = new MobXRepository<INotificationMeta | null>(null);
    private messageRepository = new MobXRepository<string>('');

    public get notifications() {
        return this.notificationsRepository.data || [];
    }

    public set notifications(notifications: INotification[]) {
        this.notificationsRepository.save(notifications);
    }

    public get current() {
        return this.currentRepository.data;
    }

    public set current(notification: INotification | null) {
        this.currentRepository.save(notification);
    }

    public get meta() {
        return this.metaRepository.data;
    }

    public set meta(meta: INotificationMeta | null) {
        this.metaRepository.save(meta);
    }

    public get message() {
        return this.messageRepository.data || '';
    }

    public set message(message: string) {
        this.messageRepository.save(message);
    }

    public append(data: { data: INotification[], meta: INotificationMeta }) {
        this.notifications = [...this.notifications, ...data.data];
        this.meta = data.meta;
    }

    public clear() {
        this.notifications = [];
        this.current = null;
        this.meta = null;
        this.message = '';
    }
}

export const notificationModel = new NotificationModel();
