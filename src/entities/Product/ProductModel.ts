import { MobXRepository } from '@/repository/MobXRepository';
import { IProduct } from './IProduct';
import { IProductMeta } from './IProductMeta';

export interface IProductModel {
    activeProducts: { data: IProduct[], meta: IProductMeta | null } | null;
    inactiveProducts: { data: IProduct[], meta: IProductMeta | null } | null;
    current: IProduct | null;
}

class ProductModel implements IProductModel {
    private activeProductsRepository = new MobXRepository<{ data: IProduct[], meta: IProductMeta | null } | null>(null, 'ACTIVE_PRODUCTS');
    private inactiveProductsRepository = new MobXRepository<{ data: IProduct[], meta: IProductMeta | null } | null>(null, 'INACTIVE_PRODUCTS');
    private currentRepository = new MobXRepository<IProduct | null>(null);

    public get activeProducts() {
        return this.activeProductsRepository.data;
    }

    public set activeProducts(products: { data: IProduct[], meta: IProductMeta | null } | null) {
        this.activeProductsRepository.save(products);
    }

    public get inactiveProducts() {
        return this.inactiveProductsRepository.data;
    }

    public set inactiveProducts(products: { data: IProduct[], meta: IProductMeta | null } | null) {
        this.inactiveProductsRepository.save(products);
    }

    public get current() {
        return this.currentRepository.data;
    }

    public set current(product: IProduct | null) {
        this.currentRepository.save(product);
    }

    public append(data: { data: IProduct[], meta: IProductMeta }, status: 'active' | 'inactive') {
        if (status === 'active') {
            this.activeProducts = {
                data: [...(this.activeProducts?.data || []), ...data.data],
                meta: data.meta,
            };
        } else {
            this.inactiveProducts = {
                data: [...(this.inactiveProducts?.data || []), ...data.data],
                meta: data.meta,
            };
        }
    }

    public clear() {
        this.current = null;
        this.activeProducts = null;
        this.inactiveProducts = null;
    }

}

export const productModel = new ProductModel();
