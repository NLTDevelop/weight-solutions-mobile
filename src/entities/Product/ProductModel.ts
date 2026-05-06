import { MobXRepository } from '@/repository/MobXRepository';
import { IProduct } from './IProduct';
import { IProductMeta } from './IProductMeta';

export interface IProductModel {
    products: IProduct[];
    current: IProduct | null;
    meta: IProductMeta | null;
}

class ProductModel implements IProductModel {
    private productsRepository = new MobXRepository<IProduct[]>([]);
    private currentRepository = new MobXRepository<IProduct | null>(null);
    private metaRepository = new MobXRepository<IProductMeta | null>(null);

    public get products() {
        return this.productsRepository.data || [];
    }

    public set products(products: IProduct[]) {
        this.productsRepository.save(products);
    }

    public get current() {
        return this.currentRepository.data;
    }

    public set current(product: IProduct | null) {
        this.currentRepository.save(product);
    }

    public get meta() {
        return this.metaRepository.data;
    }

    public set meta(meta: IProductMeta | null) {
        this.metaRepository.save(meta);
    }

    public append(products: IProduct[]) {
        this.products = [...this.products, ...products];
    }

    public clear() {
        this.meta = null;
        this.current = null;
        this.products = [];
    }

}

export const productModel = new ProductModel();
