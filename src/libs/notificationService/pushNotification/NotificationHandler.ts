import notifee, { AndroidImportance } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { isIOS } from '../../../utils';

class NotificationHandler {
    _onNotification!: Function;
    _onRegister!: Function;

    createChannel = async (type: string = 'default') => {
        let channel = '';
        if (!isIOS) {
            switch (type) {
                case '':
                    break;
                default:
                    channel = await notifee.createChannel({
                        id: 'default',
                        name: 'Default Channel',
                        sound: 'default',
                        importance: AndroidImportance.HIGH,
                    });
                    break;
            }
        }
        return channel || null;
    };

    checkPermission = async () => {
        const settings = await notifee.getNotificationSettings();
        return settings.authorizationStatus;
    }

    requestPermission = async () => {
        const { authorizationStatus } = await notifee.requestPermission();
        return authorizationStatus;
    };

    createLocalNotificationBody = async (remoteMessage: any): Promise<any> => {
        try {
            const result = {
                title: remoteMessage.data?.Title || remoteMessage.notification?.title || '',
                body: remoteMessage.data?.Body || remoteMessage.notification?.body || '',
            }
            return result;
        } catch (e) {
            console.error('createLocalNotification ===> ', e);
            return { title: remoteMessage.data?.Title || '', body: remoteMessage.data?.Body || '' }
        }
    };

    createLocalNotification = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<void> => {
        try {
            notifee.incrementBadgeCount();
            const { title, body } = await this.createLocalNotificationBody(remoteMessage);
            const notification = {
                id: String(remoteMessage.messageId),
                title: title || '',
                body: body || '',
                data: remoteMessage?.data,
                android: {
                    channelId: 'default',
                    pressAction: { id: 'default' },
                    largeIcon: String(
                        remoteMessage.data?.imageUrl || remoteMessage.data?.fcm_options?.image || undefined,
                    ),
                    importance: AndroidImportance.HIGH,
                    sound: 'default',
                },
                ios: {
                    sound: 'default',
                    attachments: [
                        {
                            url: String(
                                remoteMessage.data?.imageUrl || remoteMessage.data?.fcm_options?.image || undefined,
                            ),
                        },
                    ],
                },
            };

            await notifee.displayNotification(notification);
        } catch (e) {
            console.error('createLocalNotification ===> ', e);
        }
    };

    subscribeAppOnForegroundEvents = (callBack: Function) => {
        const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => callBack(type, detail));

        return () => {
            unsubscribe;
        };
    };

    subscribeAppOnBackgroundEvents = (callBack: Function) => {
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            await callBack(type, detail);
        });
    };

    incrementBadgeCount = (incrementBy?: undefined | number) => {
        notifee.incrementBadgeCount(incrementBy);
    };

    decrementBadgeCount = (decrementBy?: undefined | number) => {
        notifee.incrementBadgeCount(decrementBy);
    };

    removeAllDeliveredNotifications = (): void => {
        notifee.setBadgeCount(0);
        notifee.cancelAllNotifications();
    };
}

export const notificationHandler = new NotificationHandler();
