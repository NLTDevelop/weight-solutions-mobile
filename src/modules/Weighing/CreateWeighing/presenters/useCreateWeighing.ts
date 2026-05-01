import { orderService } from '@/entities/Order/OrderService';
import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useCreateWeighingUi } from './useCreateWeighingUi';

const PRODUCT_LIMIT = 100;

export const useCreateWeighing = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [carNumber, setCarNumber] = useState('');
    const [weightBefore, setWeightBefore] = useState('');
    const [weightAfter, setWeightAfter] = useState('');
    const [scalePoint, setScalePoint] = useState('');
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
    }, []);

    const onSelectProduct = (productId: number) => {
        setSelectedProductId(productId);
    };

    const { productOptions, productErrorText, carNumberErrorText, weightBeforeErrorText, weightAfterErrorText, scalePointErrorText, isSubmitDisabled } = useCreateWeighingUi({
        products: productModel.products,
        selectedProductId,
        carNumber,
        weightBefore,
        weightAfter,
        scalePoint,
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

    const onChangeScalePoint = (value: string) => {
        setScalePoint(value);
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

        const response = await orderService.create({
            product_id: selectedProductId,
            car_number: carNumber.trim(),
            weight_before: weightBefore.trim(),
            weight_after: weightAfter.trim(),
            type: scalePoint.trim(),
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('Weighing creation failed', response.message || 'Please try again');
            return;
        }

        toastService.showSuccess('Weighing created', `#${response.data.data.id}`);
        navigation.replace('WeighingView', { orderId: response.data.data.id });
    };

    return {
        productOptions,
        carNumber,
        weightBefore,
        weightAfter,
        scalePoint,
        isLoading,
        isProductsLoading,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        scalePointErrorText,
        isSubmitDisabled,
        onRefreshProducts: loadProducts,
        onChangeCarNumber,
        onChangeWeightBefore,
        onChangeWeightAfter,
        onChangeScalePoint,
        onPressBack,
        onSubmit,
    };
};
