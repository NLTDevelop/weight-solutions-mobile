import { ILinks, links as appLinks } from "@/Links";
import { IRequester, requester as appRequester } from "../../libs/requester";
import { IResponse } from "../../libs/requester/IRequester/IResponse";
import { IUser } from "./IUser";
import { userModel } from "./UserModel";
import { UserSignInDto } from "./dto/user-sign-in.dto";
import { UserUpdateDto } from "../Users/dto/user-update.dto";
import { contactInformationModel } from "../ContactInformation/ContactInformationModel";

class UserService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    signIn = async (body: UserSignInDto): Promise<IResponse<{ data: IUser }>> => {
        try {
            const response = await this.requester.request({
                url: this.links.signIn,
                method: 'POST',
                data: body,
                withCredentials: true,
            });
            if (!response.isError && response.data?.data) {
                userModel.user = response.data.data;
                contactInformationModel.contactInformation = response.data.data.contact || null;
            }
            return response;
        } catch (error) {
            console.warn('UserService -> signIn: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    update = async (userId: number, body: UserUpdateDto): Promise<IResponse<{ data: IUser }>> => {
        try {
            const response = await this.requester.request({
                url: this.links.userDetails(userId),
                method: 'PUT',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                userModel.user = response.data.data;
                contactInformationModel.contactInformation = response.data.data.contact || contactInformationModel.contactInformation;
            }

            return response;
        } catch (error) {
            console.warn('UserService -> update: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

}

export const userService = new UserService(appRequester, appLinks);
