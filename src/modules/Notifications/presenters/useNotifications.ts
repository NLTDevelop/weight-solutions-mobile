import { useUiContext } from '@/UIProvider';
import { notificationEntityService } from '@/entities/Notification/NotificationService';
import { toastService } from '@/libs/toast/toastService';
import { useCallback, useState } from 'react';

export const useNotifications = () => {
    const { t } = useUiContext();
    const [refreshKey, setRefreshKey] = useState(0);
    const [isReadAllLoading, setIsReadAllLoading] = useState(false);

    const onReadAll = useCallback(async () => {
        setIsReadAllLoading(true);

        const response = await notificationEntityService.readAll();

        setIsReadAllLoading(false);

        if (response.isError) {
            toastService.showError(t('notifications.readAllFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        setRefreshKey(currentValue => currentValue + 1);
    }, [t]);

    const onNotificationsChanged = useCallback(() => {
        setRefreshKey(currentValue => currentValue + 1);
    }, []);

    return {
        refreshKey,
        isReadAllLoading,
        onReadAll,
        onNotificationsChanged,
    };
};
