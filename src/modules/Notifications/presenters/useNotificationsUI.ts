import { INotification } from '@/entities/Notification/INotification';
import { INotificationCard } from '../types/INotificationCard';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';

interface IProps {
    notifications: INotification[];
    status: NotificationStatusEnum;
}

const isNotificationVisibleForStatus = (notification: INotification, status: NotificationStatusEnum) => {
    if (status === NotificationStatusEnum.ALL) {
        return true;
    } else if(status === NotificationStatusEnum.READ){
        return notification.read_at !== null;
    }
    return !notification.read_at;
};

export const useNotificationUi = ({ notifications, status, }: IProps) => {
    const notificationCards: INotificationCard[] = notifications
        .filter(notification => isNotificationVisibleForStatus(notification, status))
        .map(notification => ({
            id: notification.id,
            title: notification.title,
            content: notification.content,
            createdAt: notification.created_at,
            isUnread: notification.read_at === null,
        }));

    return {
        notificationCards,
    };
};
