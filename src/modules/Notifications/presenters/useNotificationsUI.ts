import { INotification } from '@/entities/Notification/INotification';
import { INotificationCard } from '../types/INotificationCard';

interface IProps {
    notifications: INotification[];
    onPressNotification: (notification: INotification) => void;
}

export const useNotificationUi = ({ notifications, onPressNotification }: IProps) => {
    const notificationCards: INotificationCard[] = notifications
        .map(notification => ({
            id: notification.id,
            title: notification.title,
            content: notification.content,
            createdAt: notification.created_at,
            isUnread: notification.read_at === null,
            onPress: () => onPressNotification(notification),
        }));

    return {
        notificationCards,
    };
};
