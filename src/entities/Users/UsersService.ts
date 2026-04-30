import { ILinks, links as appLinks } from "@/Links";
import { companyService } from "@/entities/Company/CompanyService";
import { IRequester, requester as appRequester } from "../../libs/requester";
import { IResponse } from "../../libs/requester/IRequester/IResponse";
import { IUserMeta } from "../Users/IUserMeta";
import { usersModel } from "./UsersModel";
import { UserListDto } from "./dto/user-list.dto";
import { UserUpdateDto } from "./dto/user-update.dto";
import { IUser } from "../User/IUser";
import { UserCreateDto } from "./dto/user-create.dto";

interface IUserListResponse {
    data: IUser[];
    meta: IUserMeta;
}

interface IUserResponse {
    data: IUser;
}

class UsersService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    list = async (params: UserListDto): Promise<IResponse<IUserListResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.users,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                usersModel.users = response.data.data;
                usersModel.meta = response.data.meta;
            }

            return response;
        } catch (error) {
            console.warn('UserService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: UserCreateDto): Promise<IResponse<IUserResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.users,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                usersModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('UserService -> create: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    update = async (userId: number, body: UserUpdateDto): Promise<IResponse<IUserResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.userDetails(userId),
                method: 'PUT',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                usersModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('UserService -> update: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    delete = async (userId: number): Promise<IResponse<object>> => {
        try {
            const response = await this.requester.request({
                url: this.links.userDetails(userId),
                method: 'DELETE',
                withCredentials: true,
            });

            return response;
        } catch (error) {
            console.warn('UserService -> delete: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    details = async (companyId: number, userId: number): Promise<IResponse<IUserResponse>> => {
        try {
            const response = await companyService.details(companyId);

            if (response.isError || !response.data?.data?.users) {
                return { isError: true, data: null, message: response.message } as any;
            }

            const user = response.data.data.users.find(item => item.id === userId) || null;

            if (!user) {
                return { isError: true, data: null, message: 'User not found' } as any;
            }

            usersModel.current = user;

            return {
                isError: false,
                message: '',
                data: {
                    data: user,
                },
            };
        } catch (error) {
            console.warn('UserService -> details: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

}

export const usersService = new UsersService(appRequester, appLinks);
