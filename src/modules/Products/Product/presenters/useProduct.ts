import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useProductUi } from './useProductUi';

interface IRouteParams {
    productId: number;
}

export const useProduct = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { productId } = route.params as IRouteParams;
    const [isLoading, setIsLoading] = useState(false);

    const { infoRows } = useProductUi({
        product: productModel.current,
    });

    const loadProduct = useCallback(async () => {
        setIsLoading(true);

        const response = await productService.details(productId);

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Product loading failed', response.message || 'Please try again');
        }
    }, [productId]);

    useFocusEffect(useCallback(() => {
        loadProduct();
    }, [loadProduct]));

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditProductView', { productId });
    };

    return {
        product: productModel.current,
        infoRows,
        isLoading,
        onPressBack,
        onPressEdit,
    };
};
