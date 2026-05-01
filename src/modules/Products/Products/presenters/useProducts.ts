import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useProductsUi } from './useProductsUi';

const LIST_LIMIT = 20;

export const useProducts = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);

    const onPressProduct = (productId: number) => {
        navigation.navigate('ProductView', { productId });
    };

    const { productCards } = useProductsUi({
        products: productModel.products,
        onPressProduct,
    });

    const loadProducts = async () => {
        setIsLoading(true);

        const response = await productService.list({
            limit: LIST_LIMIT,
            offset: 0,
            status: 'active',
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Products loading failed', response.message || 'Please try again');
        }
    };

    const onPressCreateProduct = () => {
        navigation.navigate('CreateProductView');
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        productCards,
        isLoading,
        onRefresh: loadProducts,
        onPressCreateProduct,
    };
};
