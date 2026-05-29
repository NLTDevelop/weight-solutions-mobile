import { useUiContext } from '@/UIProvider';
import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWeighingsUi } from './useWeighingsUi';

const LIST_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

export const useWeighings = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<OrderListDtoStatusEnum>(OrderListDtoStatusEnum.ACTIVE);
    const searchRef = useRef(search);
    const statusRef = useRef(status);

    useEffect(() => {
        return () => {
            orderModel.isGuest = null;
        }
    }, [])

    const onPressWeighing = (orderId: number) => {
        navigation.navigate('WeighingView', { orderId });
    };

    const onPressWeighingAction = (orderId: number) => {
        navigation.navigate('EditWeighingView', { orderId });
    };

    const { weighingCards } = useWeighingsUi({
        orders: orderModel.orders,
        status,
        onPressWeighing,
        onPressWeighingAction,
    });

    useEffect(() => {
        searchRef.current = search;
        statusRef.current = status;
    }, [search, status]);

    const loadOrders = useCallback(async (
        offset: number = 0,
        searchValue = searchRef.current,
        statusValue = statusRef.current,
    ) => {
        setIsLoading(true);

        const response = await orderService.list({
            limit: LIST_LIMIT,
            offset,
            status: statusValue,
            is_guest: !!orderModel.isGuest,
            car_number: searchValue.trim() || undefined,
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('weighings.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [t]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadOrders(0, search, status);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadOrders, search, status]);

    const onPressCreateWeighing = () => {
        navigation.navigate('CreateWeighingView', { isGuest: false });
    };

    const onEndReached = async () => {
        if (isLoading || ((orderModel.meta?.total || 0) <= orderModel.orders.length)) {
            return;
        }

        await loadOrders(orderModel.orders.length, search, status);
    };

    return {
        weighingCards,
        search,
        status,
        isLoading,
        onRefresh: () => loadOrders(0, search, status),
        onEndReached,
        onChangeSearch: setSearch,
        onSelectStatus: setStatus,
        onPressCreateWeighing,
        contactInformation: contactInformationModel.contactInformation,
    };
};
