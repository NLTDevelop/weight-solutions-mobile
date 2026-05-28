// import { deleteToken, getInitialNotification, getMessaging, getToken, hasPermission, onMessage, onNotificationOpenedApp, onTokenRefresh, registerDeviceForRemoteMessages, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
// import { IMessaging } from './IMessaging';

// export class FirebaseMessaging implements IMessaging {

//     private _messaging = getMessaging();

//     requestUserPermission = async (): Promise<number> => {
//         try {
//             const result = await hasPermission(this._messaging);
//             return result;
//         } catch (error) {
//             console.warn('FirebaseMessaging -> requestUserPermission: ', error);
//             return 0;
//         }
//     }

//     registerAppWithFCM = async (): Promise<void> => {
//         try {
//             await this.requestUserPermission();
//             if (!this._messaging.isDeviceRegisteredForRemoteMessages) {
//                 await registerDeviceForRemoteMessages(this._messaging);
//             }
//         } catch (error) {
//             console.warn('FirebaseMessaging -> registerAppWithFCM: ', error);
//         }
//     };

//     getFCMToken = async (): Promise<string> => {
//         try {
//             const FCMToken = await getToken(this._messaging);
//             console.log(FCMToken);
//             // Alert.alert('Token', FCMToken, [
//             //     {
//             //         text: 'Copy',
//             //         onPress: () => Clipboard.setString(FCMToken || ''),
//             //     }
//             // ]);
//             return FCMToken;
//         } catch (error) {
//             console.warn('FirebaseMessaging -> getFCMToken: ', error);
//             return '';
//         }
//     }

//     onUpdateToken = (callBack: Function): Function => {
//         const unsubscribe = onTokenRefresh(this._messaging, async token => await callBack(token));
//         return unsubscribe;
//     }

//     removeFCMToken = async (): Promise<void> => {
//         try {
//             await deleteToken(this._messaging);
//         } catch (error) {
//             console.warn('FirebaseMessaging -> removeFCMToken: ', error);
//         }
//     }

//     subscribeAppOnBackgroundMessages = (callBack: Function) => {
//         setBackgroundMessageHandler(this._messaging, async remoteMessage => {
//             if (remoteMessage) {
//                 await callBack(remoteMessage);
//             }
//         });
//     };

//     subscribeAppOnForegroundMessages = (callBack: Function): Function => {
//         const unsubscribeOnOpenedApp = onNotificationOpenedApp(this._messaging, remoteMessage => {
//             if (remoteMessage) {
//                 callBack(remoteMessage, 'onNotificationOpenedApp');
//             }
//         });

//         getInitialNotification(this._messaging).then(remoteMessage => {
//             if (remoteMessage) {
//                 callBack(remoteMessage, 'getInitialNotification');
//             }
//         });

//         const unsubscribe = onMessage(this._messaging, async remoteMessage => {
//             if (remoteMessage) {
//                 callBack(remoteMessage, 'onMessage');
//             }
//         });

//         return () => {
//             unsubscribe();
//             unsubscribeOnOpenedApp()
//         };
//     };

// }
