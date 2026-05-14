import { IProduct } from '@/entities/Product/IProduct';

export interface IProductCardItem {
    id: number;
    title: string;
    description: string | null;
    onPress: () => void;
}

interface IProps {
    products: IProduct[];
    searchQuery: string;
    onPressProduct: (productId: number) => void;
}

export const useProductsUi = ({ products, searchQuery, onPressProduct }: IProps) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const productCards: IProductCardItem[] = products
        .filter(product => {
            if (!normalizedQuery) {
                return true;
            }

            return product.name.toLowerCase().includes(normalizedQuery)
                || (product.description || '').toLowerCase().includes(normalizedQuery);
        })
        .map(product => ({
        id: product.id,
        title: product.name,
        description: product.description,
        onPress: () => onPressProduct(product.id),
    }));

    return {
        productCards,
    };
};
