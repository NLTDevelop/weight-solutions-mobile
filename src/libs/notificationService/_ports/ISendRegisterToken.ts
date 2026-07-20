import { IResponse } from "../../requester/IRequester/IResponse";

export interface ISendRegisterToken {
    registerToken: (token: string) => Promise<IResponse<{ message: string }>>;
}
