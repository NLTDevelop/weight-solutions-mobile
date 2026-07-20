import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { useEditWeighingUi } from './useEditWeighingUi';
import { getFirstWeighingItem, getFirstWeighingType, getSecondWeighingItem, getSecondWeighingType } from '@/modules/Weighing/utils/weight';
import { useUiContext } from '@/UIProvider';
import { WeightType } from '@/entities/Order/types';
import { useWeightingConnection } from '@/hooks/useWeightingConnection';

interface IRouteParams {
    orderId: number;
}

export const useEditWeighing = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { orderId } = route.params as IRouteParams;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [secondWeight, setSecondWeight] = useState('');
    const [weightType, setWeightType] = useState<WeightType | null>(null);
    const { isScaleConnected } = useWeightingConnection({ onStableWeight: setSecondWeight });

    const currentOrder = orderModel.getById(orderId);

    useEffect(() => {
        if (currentOrder) {
            return;
        }

        const loadOrder = async () => {
            setIsLoading(true);
            await orderService.syncPendingOrders();

            const response = await orderService.details(orderId);

            setIsLoading(false);

            if (response.isError) {
                toastService.showError(t('weighings.loadingFailed'), response.message || t('profile.tryAgainPlease'));
            }
        };

        loadOrder();
    }, [currentOrder, orderId, t]);

    const order = orderModel.getById(orderId) || currentOrder;
    const resolvedOrderId = order?.id ?? orderId;
    const firstItem = getFirstWeighingItem(order);
    const firstWeightType = getFirstWeighingType(order);
    const secondWeightType = getSecondWeighingType(order);
    const secondItem = getSecondWeighingItem(order);

    const weightTypeItems = useMemo(() => {
        if (secondItem) {
            setWeightType(secondWeightType);
        }

        return secondItem
            ? [
                { label: t(`weighings.weightTypes.${secondWeightType}`), value: secondWeightType },
            ]
            : [
                { label: t(`weighings.weightTypes.${firstWeightType}`), value: firstWeightType },
                { label: t(`weighings.weightTypes.${secondWeightType}`), value: secondWeightType },
            ];
    }, [firstWeightType, secondItem, secondWeightType, t]);

    const { weightTypeErrorText, secondWeightErrorText, isSubmitDisabled } = useEditWeighingUi({
        secondWeight,
        weightType,
        isSubmitted,
        isLoading,
    });

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);
        const is_correction = !!order?.items?.some(item => item.weight_type === weightType);

        const response = await orderService.addItem(resolvedOrderId, {
            weight: secondWeight.trim(),
            weight_type: weightType!,
            is_correction: String(is_correction) as 'true' | 'false',
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('weighings.secondWeightFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(
            response.type === 'OFFLINE_QUEUED' ? t('weighings.secondWeightSavedOffline') : t('weighings.secondWeightSaved'),
            `#${Math.abs(response.data.data.id)}`
        );
        navigation.replace('WeighingView', { orderId: resolvedOrderId });
    };

    return {
        recordNumber: order ? `#${order.id}` : '',
        carPhone: order?.car_phone || '',
        carNumber: order?.car_number || '',
        selectedProductId: order?.product?.id || null,
        productName: order?.product?.name || '',
        movementType: order?.type || 'loading',
        weightCount: order?.weight_count || 2,
        firstWeightDateTime: firstItem?.created_at || order?.created_at || '',
        firstWeight: firstItem?.weight || '',
        firstWeightType,
        secondWeightDateTime: new Date().toISOString(),
        secondWeight,
        weightType,
        weightTypeItems,
        isLoading,
        isScaleConnected,
        weightTypeErrorText,
        secondWeightErrorText,
        isSubmitDisabled,
        onSelectWeightType: setWeightType,
        onPressBack: () => navigation.goBack(),
        onSubmit,
    };
};
