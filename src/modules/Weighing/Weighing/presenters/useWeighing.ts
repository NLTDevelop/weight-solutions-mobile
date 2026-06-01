import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useWeighingUi } from './useWeighingUi';
import { useUiContext } from '@/UIProvider';
import { userModel } from '@/entities/User/UserModel';
import { IOrder } from '@/entities/Order/IOrder';

interface IRouteParams {
    orderId: number;
    order?: IOrder;
}

export const useWeighing = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { orderId, order } = route.params as IRouteParams;
    const [isLoading, setIsLoading] = useState(false);
    const currentOrder = order || orderModel.getById(orderId);

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

    useEffect(() => {
        if (!order) {
            loadOrder();
        }
    }, [loadOrder, order]);

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditWeighingView', { orderId: currentOrder?.id ?? orderId, order });
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
