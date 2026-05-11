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
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    const onPressProduct = (productId: number) => {
        navigation.navigate('ProductView', { productId });
    };

    const { productCards } = useProductsUi({
        products: productModel.products,
        searchQuery,
        onPressProduct,
    });

    const loadProducts = useCallback(async () => {
        setIsLoading(true);

        const response = await productService.list({
            limit: LIST_LIMIT,
            offset: 0,
            status,
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('products.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [status, t]);

    const onPressCreateProduct = () => {
        navigation.navigate('CreateProductView');
    };

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const onChangeSearchQuery = (value: string) => {
        setSearchQuery(value);
    };

    const onSelectActive = () => {
        setStatus('active');
    };

    const onSelectInactive = () => {
        setStatus('inactive');
    };

    return {
        productCards,
        searchQuery,
        status,
        isLoading,
        onRefresh: loadProducts,
        onChangeSearchQuery,
        onSelectActive,
        onSelectInactive,
        onPressCreateProduct,
    };
};
