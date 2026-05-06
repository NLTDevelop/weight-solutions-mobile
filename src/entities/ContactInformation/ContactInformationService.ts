import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { IContactInformation } from './IContactInformation';
import { contactInformationModel } from './ContactInformationModel';

interface IContactInformationResponse {
    data: IContactInformation;
}

class ContactInformationService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    details = async (): Promise<IResponse<IContactInformationResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.userContact,
                method: 'GET',
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                contactInformationModel.contactInformation = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('ContactInformationService -> details: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    save = async (body: IContactInformation): Promise<IResponse<IContactInformationResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.userContactSave,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                contactInformationModel.contactInformation = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('ContactInformationService -> save: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };
}

export const contactInformationService = new ContactInformationService(appRequester, appLinks);
