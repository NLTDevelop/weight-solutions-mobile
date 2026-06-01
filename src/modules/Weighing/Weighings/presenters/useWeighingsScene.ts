import { useUiContext } from '@/UIProvider';
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

interface IProps {
    status: OrderListDtoStatusEnum;
}

export const useWeighingsScene = ({ status }: IProps) => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef(search);

    const currentOrders = status === OrderListDtoStatusEnum.ARCHIVE
        ? orderModel.ordersArchived
        : orderModel.ordersActive;
    const currentMeta = status === OrderListDtoStatusEnum.ARCHIVE
        ? orderModel.metaArchived
        : orderModel.metaActive;

    const onPressWeighing = (orderId: number) => {
        navigation.navigate('WeighingView', { orderId });
    };

    const onPressWeighingAction = (orderId: number) => {
        navigation.navigate('EditWeighingView', { orderId });
    };

    const { weighingCards } = useWeighingsUi({
        orders: currentOrders,
        onPressWeighing,
        onPressWeighingAction,
    });

    useEffect(() => {
        searchRef.current = search;
    }, [search]);

    const loadOrders = useCallback(async (
        offset: number = 0,
        searchValue = searchRef.current,
    ) => {
        setIsLoading(true);

        const response = await orderService.list({
            limit: LIST_LIMIT,
            offset,
            status,
            is_guest: !!orderModel.isGuest,
            car_number: searchValue.trim() || undefined,
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('weighings.listLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [status, t]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadOrders(0, search);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadOrders, search]);

    const onEndReached = async () => {
        if (isLoading || ((currentMeta?.total || 0) <= currentOrders.length)) {
            return;
        }

        await loadOrders(currentOrders.length, search);
    };

    return {
        search,
        isLoading,
        weighingCards,
        onRefresh: () => loadOrders(0, search),
        onEndReached,
        onChangeSearch: setSearch,
    };
};
