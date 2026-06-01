import { userModel } from "@/entities/User/UserModel";
import { useEffect, useState } from "react";
// import { notificationService } from "./NotificationService";
// import notifee from '@notifee/react-native';
// import { notificationEntityService } from "@/entities/Notification/NotificationService";

export const useNotifications = () => {
    const [isGranted, setIsGranted] = useState(true);
    const user = userModel.user;


    useEffect(() => {
        // notificationService.checkIsPermissionGranted().then(setIsGranted);
        if (user?.role === 'admin') {
            // notificationService.requestPermissions().then(() => {
            //     notificationService.checkIsPermissionGranted().then(setIsGranted);
            //     notificationService.createChannels()
            //     notificationService.getFCMToken()
            //         .then(token => { notificationEntityService.registerToken(token); })
            //         .catch(err => console.error('Error fetching FCM token:', err));
            // });
        }
        // const unsubscribe = notificationService.subscribeForeground();
        // notificationService.removeAllDeliveredNotifications();

        // return () => {
        //     unsubscribe();
        // };
    }, [user?.role]);

    useEffect(() => {
        // notifee.getInitialNotification().then((notification: any) => {
        //     notificationService.onInitialNotification(notification)
        // });
    }, []);

    return { isGranted, setIsGranted };

};
