import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useWeighingsUi } from './useWeighingsUi';

const LIST_LIMIT = 20;

export const useWeighings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);

    const onPressWeighing = (orderId: number) => {
        navigation.navigate('WeighingView', { orderId });
    };

    const { weighingCards } = useWeighingsUi({
        orders: orderModel.orders,
        onPressWeighing,
    });

    const loadOrders = async () => {
        setIsLoading(true);

        const response = await orderService.list({
            limit: LIST_LIMIT,
            offset: 0,
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Weighings loading failed', response.message || 'Please try again');
        }
    };

    const onPressCreateWeighing = () => {
        navigation.navigate('CreateWeighingView');
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        weighingCards,
        isLoading,
        onRefresh: loadOrders,
        onPressCreateWeighing,
    };
};
