import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useWeighingUi } from './useWeighingUi';
import { useUiContext } from '@/UIProvider';
import { userModel } from '@/entities/User/UserModel';

interface IRouteParams {
    orderId: number;
}

export const useWeighing = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { orderId } = route.params as IRouteParams;
    const [isLoading, setIsLoading] = useState(false);
    const currentOrder = orderModel.getById(orderId);

    const { sections, status, actionLabel } = useWeighingUi({
        order: currentOrder,
        user: userModel.user
    });

    const loadOrder = useCallback(async () => {
        setIsLoading(true);
        await orderService.syncPendingOrders();

        const response = await orderService.details(orderId);

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('weighings.loadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [orderId, t]);

    useFocusEffect(useCallback(() => {
        loadOrder();
    }, [loadOrder]));

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditWeighingView', { orderId: currentOrder?.id ?? orderId });
    };

    return {
        order: currentOrder,
        sections,
        status,
        actionLabel,
        isLoading,
        onPressBack,
        onPressEdit,
    };
};
