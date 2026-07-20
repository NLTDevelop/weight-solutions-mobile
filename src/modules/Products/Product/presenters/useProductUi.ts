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
            id: 'name',
            label: 'products.nameLabel',
            value: product?.name || 'products.titleFallback',
        },
        {
            id: 'description',
            label: 'products.descriptionLabel',
            value: product?.description || 'products.descriptionFallback',
        },
    ];

    return {
        infoRows,
        status: product?.active || 'inactive',
    };
};
