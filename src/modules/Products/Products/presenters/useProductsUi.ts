import { IProduct } from '@/entities/Product/IProduct';

export interface IProductCardItem {
    id: number;
    title: string;
    description: string | null;
    status: string;
    onPress: () => void;
}

interface IProps {
    products: IProduct[];
    onPressProduct: (productId: number) => void;
}

export const useProductsUi = ({ products, onPressProduct }: IProps) => {
    const productCards: IProductCardItem[] = products.map(product => ({
        id: product.id,
        title: product.name,
        description: product.description,
        status: product.active,
        onPress: () => onPressProduct(product.id),
    }));

    return {
        productCards,
    };
};
