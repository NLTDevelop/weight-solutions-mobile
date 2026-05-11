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

    const productsBucket = status === 'active' ? productModel.activeProducts : productModel.inactiveProducts;
    const products = productsBucket?.data || [];

    const { productCards } = useProductsUi({
        products,
        searchQuery,
        onPressProduct,
    });

    const loadProducts = useCallback(async (offset: number = 0) => {
        setIsLoading(true);
        const response = await productService.list({ limit: LIST_LIMIT, offset, status, name: searchQuery });
        setIsLoading(false);
        if (response.isError) {
            toastService.showError(t('products.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [searchQuery, status, t]);

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

    const onSelectStatus = (nextStatus: any) => {
        setStatus(nextStatus);
    };

    const onEndReached = async () => {
        if (isLoading || ((productsBucket?.meta?.total || 0) <= products.length)) return;
        await loadProducts(products.length);
    }

    return {
        productCards,
        searchQuery,
        status,
        isLoading,
        onEndReached,
        onRefresh: loadProducts,
        onChangeSearchQuery,
        onSelectActive,
        onSelectInactive,
        onSelectStatus,
        onPressCreateProduct,
    };
};
