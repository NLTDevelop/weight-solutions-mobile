import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { ISendDeleteToken } from '@/libs/notificationService/_ports/ISendDeleteToken';
import { ISendRegisterToken } from '@/libs/notificationService/_ports/ISendRegisterToken';
import { userModel } from '../User/UserModel';
import { INotification } from './INotification';
import { INotificationMeta } from './INotificationMeta';
import { notificationModel } from './NotificationModel';
import { NotificationCreateDto } from './dto/notification-create.dto';
import { NotificationDeleteDto } from './dto/notification-delete.dto';
import { NotificationListDto } from './dto/notification-list.dto';

interface INotificationListResponse {
    data: INotification[];
    meta: INotificationMeta;
}

interface INotificationMessageResponse {
    message: string;
}

class NotificationService implements ISendRegisterToken, ISendDeleteToken {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    list = async (params: NotificationListDto): Promise<IResponse<INotificationListResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.notification,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                notificationModel.notifications = response.data.data;
                notificationModel.meta = response.data.meta;
            }

            return response;
        } catch (error) {
            console.warn('NotificationService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: NotificationCreateDto): Promise<IResponse<INotificationMessageResponse>> => {
        try {
            const response = await this.requester.request({
                url: `${this.links.notification}/create`,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.message) {
                notificationModel.message = response.data.message;
            }

            return response;
        } catch (error) {
            console.warn('NotificationService -> create: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    registerToken = async (token: string): Promise<IResponse<INotificationMessageResponse>> => {
        const id = userModel.user?.id;

        if (!id) {
            return { isError: true, data: null, message: 'Username not found' } as any;
        }

        return this.create({
            id,
            fcm_token: token,
        });
    };

    delete = async (body: NotificationDeleteDto): Promise<IResponse<INotificationMessageResponse>> => {
        try {
            const response = await this.requester.request({
                url: `${this.links.notification}/delete`,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.message) {
                notificationModel.message = response.data.message;
            }

            return response;
        } catch (error) {
            console.warn('NotificationService -> delete: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    deleteToken = async (token: string): Promise<IResponse<INotificationMessageResponse>> => {
        return this.delete({
            fcm_token: token,
        });
    };

    readAll = async (): Promise<IResponse<INotificationMessageResponse>> => {
        try {
            const response = await this.requester.request({
                url: `${this.links.notification}/read-all`,
                method: 'POST',
                withCredentials: true,
            });

            if (!response.isError && response.data?.message) {
                notificationModel.message = response.data.message;
            }

            return response;
        } catch (error) {
            console.warn('NotificationService -> readAll: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    read = async (notificationId: string): Promise<IResponse<INotification>> => {
        try {
            const response = await this.requester.request({
                url: `${this.links.notification}/${notificationId}`,
                method: 'POST',
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                notificationModel.current = response.data;
            }

            return response;
        } catch (error) {
            console.warn('NotificationService -> read: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };
}

export const notificationEntityService = new NotificationService(appRequester, appLinks);
