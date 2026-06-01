import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useEditWeighingUi } from './useEditWeighingUi';
import { getFirstWeighingItem } from '@/modules/Weighing/utils/weight';
import { useUiContext } from '@/UIProvider';

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
    const { secondWeightErrorText, isSubmitDisabled } = useEditWeighingUi({
        secondWeight,
        isSubmitted,
        isLoading,
    });

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const response = await orderService.addItem(resolvedOrderId, {
            weight: secondWeight.trim(),
            weight_type: 'gross',
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
        secondWeightDateTime: new Date().toISOString(),
        secondWeight,
        isLoading,
        secondWeightErrorText,
        isSubmitDisabled,
        onChangeSecondWeight: setSecondWeight,
        onPressBack: () => navigation.goBack(),
        onSubmit,
    };
};
