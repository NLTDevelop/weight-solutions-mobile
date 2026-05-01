import { IProduct } from '@/entities/Product/IProduct';

interface IProductInfoRow {
    id: string;
    label: string;
    value: string;
}

interface IProps {
    product: IProduct | null;
}

export const useProductUi = ({ product }: IProps) => {
    const infoRows: IProductInfoRow[] = [
        {
            id: 'description',
            label: 'products.descriptionLabel',
            value: product?.description || 'products.descriptionFallback',
        },
        {
            id: 'status',
            label: 'products.statusLabel',
            value: product?.active || 'inactive',
        },
    ];

    return {
        infoRows,
    };
};
