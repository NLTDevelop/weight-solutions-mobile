import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { ICompany } from './ICompany';
import { ICompanyMeta } from './ICompanyMeta';
import { companyModel } from './CompanyModel';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyListDto } from './dto/company-list.dto';

interface ICompanyListResponse {
    data: ICompany[];
    meta: ICompanyMeta;
}

interface ICompanyResponse {
    data: ICompany;
}

class CompanyService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    list = async (params: CompanyListDto): Promise<IResponse<ICompanyListResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.company,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                companyModel.companies = response.data.data;
                companyModel.meta = response.data.meta;
            }

            return response;
        } catch (error) {
            console.warn('CompanyService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: CompanyCreateDto): Promise<IResponse<ICompanyResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.company,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                companyModel.company = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('CompanyService -> create: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    details = async (companyId: number): Promise<IResponse<ICompanyResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.companyDetails(companyId),
                method: 'GET',
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                companyModel.company = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('CompanyService -> details: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };
}

export const companyService = new CompanyService(appRequester, appLinks);
