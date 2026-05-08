import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useProductsUi } from './useProductsUi';
import { useUiContext } from '@/UIProvider';

const LIST_LIMIT = 20;

export const useProducts = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);

    const onPressProduct = (productId: number) => {
        navigation.navigate('ProductView', { productId });
    };

    const { productCards } = useProductsUi({
        products: productModel.products,
        onPressProduct,
    });

    const loadProducts = useCallback(async () => {
        setIsLoading(true);

        const response = await productService.list({
            limit: LIST_LIMIT,
            offset: 0,
            status: 'active',
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('product.loadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [t]);

    const onPressCreateProduct = () => {
        navigation.navigate('CreateProductView');
    };

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return {
        productCards,
        isLoading,
        onRefresh: loadProducts,
        onPressCreateProduct,
    };
};
