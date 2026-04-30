import { ILinks, links as appLinks } from "@/Links";
import { IRequester, requester as appRequester } from "../../libs/requester";
import { IResponse } from "../../libs/requester/IRequester/IResponse";
import { IUser } from "./IUser";
import { userModel } from "./UserModel";
import { UserSignInDto } from "./dto/user-sign-in.dto";

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
            }
            return response;
        } catch (error) {
            console.warn('UserService -> signIn: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

}

export const userService = new UserService(appRequester, appLinks);
