import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useEditWeighingUi } from './useEditWeighingUi';

const PRODUCT_LIMIT = 100;

interface IRouteParams {
    orderId: number;
}

export const useEditWeighing = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { orderId } = route.params as IRouteParams;
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [carNumber, setCarNumber] = useState('');
    const [weightBefore, setWeightBefore] = useState('');
    const [weightAfter, setWeightAfter] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isProductsLoading, setIsProductsLoading] = useState(false);

    const loadProducts = async () => {
        setIsProductsLoading(true);

        const response = await productService.list({
            limit: PRODUCT_LIMIT,
            offset: 0,
            status: 'active',
        });

        setIsProductsLoading(false);

        if (response.isError) {
            toastService.showError('Products loading failed', response.message || 'Please try again');
        }
    };

    useEffect(() => {
        loadProducts();

        if (orderModel.current?.id === orderId) {
            setSelectedProductId(orderModel.current.product?.id || null);
            setCarNumber(orderModel.current.car_number || '');
            setWeightBefore(orderModel.current.weight_before || '');
            setWeightAfter(orderModel.current.weight_after || '');
            return;
        }

        const loadOrder = async () => {
            setIsLoading(true);

            const response = await orderService.details(orderId);

            setIsLoading(false);

            if (response.isError || !response.data?.data) {
                toastService.showError('Weighing loading failed', response.message || 'Please try again');
                return;
            }

            setSelectedProductId(response.data.data.product?.id || null);
            setCarNumber(response.data.data.car_number || '');
            setWeightBefore(response.data.data.weight_before || '');
            setWeightAfter(response.data.data.weight_after || '');
        };

        loadOrder();
    }, [orderId]);

    const onSelectProduct = (productId: number) => {
        setSelectedProductId(productId);
    };

    const { productOptions, productErrorText, carNumberErrorText, weightBeforeErrorText, weightAfterErrorText, isSubmitDisabled } = useEditWeighingUi({
        products: productModel.products,
        selectedProductId,
        carNumber,
        weightBefore,
        weightAfter,
        isSubmitted,
        isLoading,
        onSelectProduct,
    });

    const onChangeCarNumber = (value: string) => {
        setCarNumber(value);
    };

    const onChangeWeightBefore = (value: string) => {
        setWeightBefore(value);
    };

    const onChangeWeightAfter = (value: string) => {
        setWeightAfter(value);
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled || !selectedProductId) {
            return;
        }

        setIsLoading(true);

        const response = await orderService.update(orderId, {
            product_id: selectedProductId,
            car_number: carNumber.trim(),
            weight_before: weightBefore.trim(),
            weight_after: weightAfter.trim(),
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('Weighing update failed', response.message || 'Please try again');
            return;
        }

        toastService.showSuccess('Weighing updated', `#${response.data.data.id}`);
        navigation.replace('WeighingView', { orderId });
    };

    return {
        productOptions,
        carNumber,
        weightBefore,
        weightAfter,
        isLoading,
        isProductsLoading,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        isSubmitDisabled,
        onRefreshProducts: loadProducts,
        onChangeCarNumber,
        onChangeWeightBefore,
        onChangeWeightAfter,
        onPressBack,
        onSubmit,
    };
};
