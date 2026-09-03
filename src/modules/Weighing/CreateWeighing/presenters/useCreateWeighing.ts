import { orderService } from '@/entities/Order/OrderService';
import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCreateWeighingUi } from './useCreateWeighingUi';
import { useUiContext } from '@/UIProvider';
import { orderModel } from '@/entities/Order/OrderModel';
import { getPrimaryWeightType, MOVEMENT_TYPE, MovementType, WeightType } from '@/entities/Order/types';
import { useWeightingConnection } from '@/hooks/useWeightingConnection';

const PRODUCT_LIMIT = 200;

export const useCreateWeighing = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [carPhone, setCarPhone] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [movementType, setMovementType] = useState<MovementType | null>(null);
    const [weightType, setWeightType] = useState<WeightType | null>(null);
    const [weightCount, setWeightCount] = useState<number | null>(2);
    const [firstWeight, setFirstWeight] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isGuest = !!orderModel.isGuest;
    const { isScaleConnected } = useWeightingConnection({ onStableWeight: setFirstWeight });

    const loadProducts = useCallback(async () => {
        const loadProductsPage = async (offset: number): Promise<boolean> => {
            const response = await productService.list({
                limit: PRODUCT_LIMIT,
                offset,
                status: 'active',
            });

            if (response.isError || !response.data) {
                toastService.showError(t('products.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
                return false;
            }

            const nextOffset = offset + response.data.data.length;

            if (nextOffset >= response.data.meta.total || response.data.data.length === 0) {
                return true;
            }

            return loadProductsPage(nextOffset);
        };

        await loadProductsPage(0);
    }, [t]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const productItems = (productModel.activeProducts?.data || []).map(product => ({
        label: product.name,
        value: product.id,
    }));

    const movementTypeItems = useMemo(() => ([
        { label: t('weighings.movementTypes.loading'), value: MOVEMENT_TYPE.loading },
        { label: t('weighings.movementTypes.unloading'), value: MOVEMENT_TYPE.unloading },
    ]), [t]);

    const weightCountItems = useMemo(() => ([
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ]), []);

    const { productErrorText,  carNumberErrorText, movementTypeErrorText, weightTypeErrorText, weightCountErrorText, firstWeightErrorText, isSubmitDisabled } = useCreateWeighingUi({
        selectedProductId,
        carNumber,
        movementType,
        weightType,
        weightCount,
        firstWeight,
        isSubmitted,
        isLoading,
    });

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled || !selectedProductId || !movementType || !weightType || !weightCount) {
            return;
        }

        setIsLoading(true);

        const response = await orderService.create({
            car_phone: carPhone.trim(),
            car_number: carNumber.trim(),
            product_id: selectedProductId,
            type: movementType,
            weight_count: weightCount,
            is_guest: String(isGuest) as 'true' | 'false',
            comment: comment.trim() || undefined,
            item: {
                weight: firstWeight.trim(),
                weight_type: weightType,
                is_correction: 'false',
            },
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('weighings.creationFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(
            response.type === 'OFFLINE_QUEUED' ? t('weighings.createdOffline') : t('weighings.created'),
            `#${Math.abs(response.data.data.id)}`
        );
        navigation.replace('WeighingView', { orderId: response.data.data.id });
    };

    const onSelectMovementType = (value: MovementType) => {
        setWeightType(getPrimaryWeightType(value));
        setMovementType(value);
    };

    return {
        recordNumber: '',
        carPhone,
        carNumber,
        selectedProductId,
        movementType,
        weightType,
        weightCount,
        firstWeight,
        comment,
        isLoading,
        isScaleConnected,
        productItems,
        movementTypeItems,
        weightCountItems,
        productErrorText,
        carNumberErrorText,
        movementTypeErrorText,
        weightTypeErrorText,
        weightCountErrorText,
        firstWeightErrorText,
        isSubmitDisabled,
        onSelectProduct: (value: number) => setSelectedProductId(value),
        onChangeCarPhone: setCarPhone,
        onChangeCarNumber: setCarNumber,
        onSelectMovementType,
        onSelectWeightCount: (value: number) => setWeightCount(value),
        onChangeComment: setComment,
        onPressBack: () => navigation.goBack(),
        onSubmit,
        isGuest,
    };
};
