import { useUiContext } from '@/UIProvider';
import { INotification } from '@/entities/Notification/INotification';
import { INotificationMeta } from '@/entities/Notification/INotificationMeta';
import { notificationEntityService } from '@/entities/Notification/NotificationService';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useNotificationUi } from './useNotificationsUI';

const LIST_LIMIT = 20;

interface IProps {
    status: NotificationStatusEnum;
    refreshKey: number;
    onNotificationsChanged: () => void;
}

const shouldKeepNotification = (notification: INotification, status: NotificationStatusEnum) => {
    if (status === NotificationStatusEnum.ALL) {
        return true;
    }

    if (status === NotificationStatusEnum.READ) {
        return notification.read_at !== null;
    }

    return notification.read_at === null;
};

export const useNotificationsScene = ({ status, refreshKey, onNotificationsChanged }: IProps) => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [meta, setMeta] = useState<INotificationMeta | null>(null);

    const loadNotifications = useCallback(async (offset: number = 0) => {
        setIsLoading(true);

        const response = await notificationEntityService.list({
            limit: LIST_LIMIT,
            offset,
            type: status,
        });

        setIsLoading(false);

        if (response.isError || !response.data) {
            toastService.showError(t('notifications.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        const nextItems = response.data.items || [];

        setNotifications((currentValue) => offset > 0 ? [...currentValue, ...nextItems] : nextItems);
        setMeta(response.data.meta);
    }, [status, t]);

    useEffect(() => {
        loadNotifications(0);
    }, [loadNotifications, refreshKey]);

    useFocusEffect(useCallback(() => {
        loadNotifications(0);
    }, [loadNotifications]));

    const onPressNotification = useCallback(async (notification: INotification) => {
        if (notification.read_at === null) {
            const response = await notificationEntityService.read(notification.id);

            if (response.isError) {
                toastService.showError(t('notifications.readFailed'), response.message || t('profile.tryAgainPlease'));
                return;
            }

            const nextReadAt = new Date().toISOString();

            setNotifications(currentValue => currentValue
                .map((currentNotification) => currentNotification.id === notification.id
                    ? { ...currentNotification, read_at: nextReadAt }
                    : currentNotification)
                .filter((currentNotification) => shouldKeepNotification(currentNotification, status)));

            onNotificationsChanged();
            notification = { ...notification, read_at: nextReadAt };
        }

        const orderId = notification.data?.number;

        if (typeof orderId === 'number') {
            navigation.navigate('WeighingView', { orderId });
        }
    }, [navigation, onNotificationsChanged, status, t]);

    const { notificationCards } = useNotificationUi({
        notifications,
        onPressNotification,
    });

    const onEndReached = async () => {
        const total = Number(meta?.total || 0);

        if (isLoading || total <= notifications.length) {
            return;
        }

        await loadNotifications(notifications.length);
    };

    return {
        notificationCards,
        isLoading,
        onEndReached,
        onRefresh: () => loadNotifications(0),
    };
};
