import { FirebaseMessaging, IMessaging } from "./firebase";
import { notificationHandler } from "./pushNotification/NotificationHandler";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { EventDetail, EventType } from "@notifee/react-native";

class NotificationService {
    private static instance: NotificationService;

    _notificationHandler = notificationHandler;
    _messaging!: IMessaging;

    constructor() {
        if (NotificationService.instance) {
            return NotificationService.instance;
        }
        this._messaging = new FirebaseMessaging();
        NotificationService.instance = this;
    }

    checkIsPermissionGranted = async () => {
        const authorizationStatus = await this._notificationHandler.checkPermission();
        return authorizationStatus === 1 || authorizationStatus === 2;
    }

    requestPermissions = async () => {
        const authorizationStatus = await this._notificationHandler.requestPermission();
        return authorizationStatus;
    };

    createChannels = async () => {
        const defaultChannelId = await this._notificationHandler.createChannel();
        return { defaultChannelId };
    };

    removeAllDeliveredNotifications = () => {
        this._notificationHandler.removeAllDeliveredNotifications();
    };

    getFCMToken = async () => {
        const token = await this._messaging.getFCMToken();
        return token;
    };

    deleteToken = async () => {
        await this._messaging.removeFCMToken();
    }

    subscribeForeground = () => {
        const unsubscribe = this._messaging?.subscribeAppOnForegroundMessages(this.onReceiveNotification);
        const unsubscribeEvent = this._notificationHandler.subscribeAppOnForegroundEvents(this.onForegroundEvent);
        return () => {
            unsubscribe?.();
            unsubscribeEvent();
        };
    }

    subscribeBackground = () => {
        this._messaging?.subscribeAppOnBackgroundMessages((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            this._notificationHandler.incrementBadgeCount()
            this.onReceiveNotification(remoteMessage, 'onMessage');
        });
    }

    onReceiveNotification = async (
        remoteMessage: FirebaseMessagingTypes.RemoteMessage,
        type: string
    ) => {
        if (type === 'onMessage' && remoteMessage) {
            console.log('Received foreground message:', remoteMessage);
            this._notificationHandler.createLocalNotification(remoteMessage);
        }
    };

    onInitialNotification = (detail: EventDetail | null) => {
        if (detail) {
            notificationHandler.decrementBadgeCount();
        }
    }

    private onForegroundEvent = (type: EventType) => {
        switch (type) {
            case EventType.PRESS:
                notificationHandler.decrementBadgeCount();
                break;
        }
    }

}

export const notificationService = new NotificationService();