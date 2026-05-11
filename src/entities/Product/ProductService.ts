import { ILinks, links as appLinks } from '@/Links';
import { IRequester, requester as appRequester } from '@/libs/requester';
import { IResponse } from '@/libs/requester/IRequester/IResponse';
import { IProduct } from './IProduct';
import { IProductMeta } from './IProductMeta';
import { productModel } from './ProductModel';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductListDto } from './dto/product-list.dto';
import { ProductUpdateDto } from './dto/product-update.dto';

interface IProductListResponse {
    data: IProduct[];
    meta: IProductMeta;
}

interface IProductResponse {
    data: IProduct;
}

class ProductService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }

    list = async (params: ProductListDto): Promise<IResponse<IProductListResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.products,
                method: 'GET',
                params,
                withCredentials: true,
            });

            if (!response.isError && response.data) {
                if (params.offset) {
                    productModel.append(response.data, params.status)
                } else if (params.status === 'active') {
                    productModel.activeProducts = {
                        data: response.data.data,
                        meta: response.data.meta,
                    };
                } else if (params.status === 'inactive') {
                    productModel.inactiveProducts = {
                        data: response.data.data,
                        meta: response.data.meta,
                    };
                }
            }

            return response;
        } catch (error) {
            console.warn('ProductService -> list: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    create = async (body: ProductCreateDto): Promise<IResponse<IProductResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.products,
                method: 'POST',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                productModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('ProductService -> create: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    details = async (productId: number): Promise<IResponse<IProductResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.productDetails(productId),
                method: 'GET',
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                productModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('ProductService -> details: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };

    update = async (productId: number, body: ProductUpdateDto): Promise<IResponse<IProductResponse>> => {
        try {
            const response = await this.requester.request({
                url: this.links.productDetails(productId),
                method: 'PUT',
                data: body,
                withCredentials: true,
            });

            if (!response.isError && response.data?.data) {
                productModel.current = response.data.data;
            }

            return response;
        } catch (error) {
            console.warn('ProductService -> update: ', error);
            return { isError: true, data: null, message: '' } as any;
        }
    };
}

export const productService = new ProductService(appRequester, appLinks);
