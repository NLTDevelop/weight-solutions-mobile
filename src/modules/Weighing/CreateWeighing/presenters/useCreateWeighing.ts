import { orderService } from '@/entities/Order/OrderService';
import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreateWeighingUi } from './useCreateWeighingUi';
import { useUiContext } from '@/UIProvider';

const PRODUCT_LIMIT = 100;

export const useCreateWeighing = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<any>();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [carPhone, setCarPhone] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [movementType, setMovementType] = useState<string | null>(null);
    const [weightCount, setWeightCount] = useState<number | null>(2);
    const [firstWeight, setFirstWeight] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isGuest = Boolean(route.params?.isGuest);

    const loadProducts = useCallback(async () => {
        const response = await productService.list({
            limit: PRODUCT_LIMIT,
            offset: 0,
            status: 'active',
        });

        if (response.isError) {
            toastService.showError(t('products.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [t]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const productItems = (productModel.activeProducts?.data || []).map(product => ({
        label: product.name,
        value: product.id,
    }));

    const movementTypeItems = useMemo(() => ([
        { label: t('weighings.movementTypes.loading'), value: 'loading' },
        { label: t('weighings.movementTypes.unloading'), value: 'unloading' },
    ]), [t]);

    const weightCountItems = useMemo(() => ([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ]), []);

    const { productErrorText, phoneErrorText, carNumberErrorText, movementTypeErrorText, weightCountErrorText, firstWeightErrorText, isSubmitDisabled } = useCreateWeighingUi({
        selectedProductId,
        carPhone,
        carNumber,
        movementType,
        weightCount,
        firstWeight,
        isSubmitted,
        isLoading,
    });

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled || !selectedProductId || !movementType || !weightCount) {
            return;
        }

        setIsLoading(true);

        const response = await orderService.create({
            car_phone: carPhone.trim(),
            car_number: carNumber.trim(),
            product_id: selectedProductId,
            type: movementType,
            weight_count: weightCount,
            is_guest: isGuest,
            comment: comment.trim() || undefined,
            item: {
                weight: firstWeight.trim(),
                weight_type: 'tare',
            },
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('weighings.creationFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('weighings.created'), `#${response.data.data.id}`);
        navigation.replace('WeighingView', { orderId: response.data.data.id });
    };

    return {
        recordNumber: '',
        carPhone,
        carNumber,
        selectedProductId,
        movementType,
        weightCount,
        firstWeight,
        comment,
        isLoading,
        productItems,
        movementTypeItems,
        weightCountItems,
        productErrorText,
        phoneErrorText,
        carNumberErrorText,
        movementTypeErrorText,
        weightCountErrorText,
        firstWeightErrorText,
        isSubmitDisabled,
        onSelectProduct: (value: number) => setSelectedProductId(value),
        onChangeCarPhone: setCarPhone,
        onChangeCarNumber: setCarNumber,
        onSelectMovementType: (value: string) => setMovementType(value),
        onSelectWeightCount: (value: number) => setWeightCount(value),
        onChangeFirstWeight: setFirstWeight,
        onChangeComment: setComment,
        onPressBack: () => navigation.goBack(),
        onSubmit,
        isGuest,
    };
};
