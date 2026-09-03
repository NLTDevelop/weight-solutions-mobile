export interface IMessaging {
    requestUserPermission: () => Promise<number>;
    getFCMToken: () => Promise<string>;
    removeFCMToken: () => Promise<void>;
    subscribeAppOnForegroundMessages: (callback: Function) => Function;
    subscribeAppOnBackgroundMessages: (callback: Function) => void;
    onUpdateToken: (callback: Function) => Function;
}
