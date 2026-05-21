import { useUiContext } from '@/UIProvider';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notificationEntityService } from '@/entities/Notification/NotificationService';
import { notificationModel } from '@/entities/Notification/NotificationModel';
import { useNotificationUi } from './useNotificationsUI';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';

const LIST_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

export const useNotifications = () => {
    const { t } = useUiContext();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<NotificationStatusEnum>(NotificationStatusEnum.ALL);
    const statusRef = useRef(status);

    const { notificationCards } = useNotificationUi({
        notifications: notificationModel.notifications,
        status,
    });

    useEffect(() => {
        statusRef.current = status;
    }, [status]);

    const loadNotifications = useCallback(async (
        offset: number = 0,
        statusValue = statusRef.current,
    ) => {
        setIsLoading(true);

        if (statusValue === NotificationStatusEnum.ALL) {
            const allMessagesResult = await notificationEntityService.list({
                limit: LIST_LIMIT,
                offset,
                type: NotificationStatusEnum.ALL,
            });


            if (allMessagesResult.isError || !allMessagesResult.data) {
                toastService.showError(t('notifications.listLoadingFailed'), allMessagesResult.message || t('profile.tryAgainPlease'));
            }
        } else if (statusValue === NotificationStatusEnum.UNREAD) {
            const unreadMessagesResponse = await notificationEntityService.list({
                limit: LIST_LIMIT,
                offset,
                type: NotificationStatusEnum.UNREAD,
            });;
            if (unreadMessagesResponse.isError || !unreadMessagesResponse.data) {
                toastService.showError(t('notifications.listLoadingFailed'), unreadMessagesResponse.message || t('profile.tryAgainPlease'));
            } else {
                 await notificationEntityService.readAll();
            }
        } else {
            const readedMessagesResponse = await notificationEntityService.list({
                limit: LIST_LIMIT,
                offset,
                type: NotificationStatusEnum.READ,
            });

            if (readedMessagesResponse.isError || !readedMessagesResponse.data) {
                toastService.showError(t('notifications.listLoadingFailed'), readedMessagesResponse.message || t('profile.tryAgainPlease'));
            }
        }
        
        setIsLoading(false);


    }, [t]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadNotifications(0, status);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadNotifications, status]);

    useFocusEffect(
        useCallback(() => {
            loadNotifications();
        }, [loadNotifications]),
    );

    const onEndReached = async () => {
        const total = Number(notificationModel.meta?.total || 0);

        if (isLoading || total <= notificationModel.notifications.length) {
            return;
        }

        await loadNotifications(notificationModel.notifications.length, status);
    };

    return {
        notificationCards,
        status,
        isLoading,
        onRefresh: () => loadNotifications(0, status),
        onEndReached,
        onSelectStatus: setStatus,
    };
};
