import { useUiContext } from '@/UIProvider';
import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarUtils, DateData } from 'react-native-calendars';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWeighingsUi } from './useWeighingsUi';
import { IOrder } from '@/entities/Order/IOrder';
import { MovementType } from '@/entities/Order/types';

const LIST_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

interface IProps {
    status: OrderListDtoStatusEnum;
}

export const useWeighingsScene = ({ status }: IProps) => {
    const { colors, t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({
        startDate: '',
        endDate: '',
        type: null as MovementType | null,
    });
    const [draftFilters, setDraftFilters] = useState({
        startDate: '',
        endDate: '',
        type: null as MovementType | null,
    });
    const searchRef = useRef(search);
    const filtersRef = useRef(appliedFilters);

    const currentOrders = status === OrderListDtoStatusEnum.ARCHIVE
        ? orderModel.ordersArchived
        : orderModel.ordersActive;
    const currentMeta = status === OrderListDtoStatusEnum.ARCHIVE
        ? orderModel.metaArchived
        : orderModel.metaActive;

    const onPressWeighing = (order: IOrder) => {
        navigation.navigate('WeighingView', { orderId: order.id, order });
    };

    const onPressWeighingAction = (order: IOrder) => {
        navigation.navigate('EditWeighingView', { orderId: order.id, order });
    };

    const { weighingCards } = useWeighingsUi({
        orders: currentOrders,
        onPressWeighing,
        onPressWeighingAction,
    });

    useEffect(() => {
        searchRef.current = search;
    }, [search]);

    useEffect(() => {
        filtersRef.current = appliedFilters;
    }, [appliedFilters]);

    const loadOrders = useCallback(async (
        offset: number = 0,
        searchValue = searchRef.current,
    ) => {
        setIsLoading(true);
        const currentFilters = filtersRef.current;

        const response = await orderService.list({
            limit: LIST_LIMIT,
            offset,
            status,
            is_guest: String(!!orderModel.isGuest) as 'true' | 'false',
            car_number: searchValue.trim() || undefined,
            start_date: currentFilters.startDate || undefined,
            end_date: currentFilters.endDate || undefined,
            type: currentFilters.type || undefined,
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

    const onToggleFilters = () => {
        setDraftFilters(filtersRef.current);
        setIsFiltersVisible(currentValue => !currentValue);
    };

    const onDayPress = (day: DateData) => {
        setDraftFilters((currentValue) => {
            if (!currentValue.startDate && !currentValue.endDate) {
                return { ...currentValue, startDate: day.dateString, endDate: day.dateString };
            }

            if (currentValue.startDate === currentValue.endDate) {
                const startDate = new Date(currentValue.startDate) < new Date(day.dateString)
                    ? currentValue.startDate
                    : day.dateString;
                const endDate = new Date(currentValue.startDate) < new Date(day.dateString)
                    ? day.dateString
                    : currentValue.startDate;

                return { ...currentValue, startDate, endDate };
            }

            return { ...currentValue, startDate: day.dateString, endDate: day.dateString };
        });
    };

    const onApplyFilters = async () => {
        filtersRef.current = draftFilters;
        setAppliedFilters(draftFilters);
        setIsFiltersVisible(false);
        await loadOrders(0, searchRef.current);
    };

    const onClearFilters = async () => {
        const clearedFilters = {
            startDate: '',
            endDate: '',
            type: null as MovementType | null,
        };

        filtersRef.current = clearedFilters;
        setDraftFilters(clearedFilters);
        setAppliedFilters(clearedFilters);
        setIsFiltersVisible(false);
        await loadOrders(0, searchRef.current);
    };

    const markedDates = useMemo(() => {
        if (!draftFilters.startDate || !draftFilters.endDate) {
            return {};
        }

        const marked: Record<string, any> = {};
        const getDay = (day: string) => CalendarUtils.getCalendarDateString(new Date(day));
        const start = new Date(draftFilters.startDate);
        const end = new Date(draftFilters.endDate);
        let current = new Date(start);

        while (current <= end) {
            const dateStr = getDay(current.toISOString());
            marked[dateStr] = {
                color: colors.primary,
                textColor: colors.text_strong,
            };
            current.setDate(current.getDate() + 1);
        }

        marked[getDay(draftFilters.startDate)] = {
            ...marked[getDay(draftFilters.startDate)],
            startingDay: true,
        };
        marked[getDay(draftFilters.endDate)] = {
            ...marked[getDay(draftFilters.endDate)],
            color: colors.primary,
            textColor: colors.text_strong,
            endingDay: true,
        };

        return marked;
    }, [colors, draftFilters.endDate, draftFilters.startDate]);

    const hasActiveFilters = !!appliedFilters.startDate || !!appliedFilters.endDate || !!appliedFilters.type;

    return {
        search,
        isLoading,
        weighingCards,
        filters: draftFilters,
        isFiltersVisible,
        hasActiveFilters,
        markedDates,
        onRefresh: () => loadOrders(0, search),
        onEndReached,
        onChangeSearch: setSearch,
        onSelectFilterType: (type: MovementType | null) => setDraftFilters((currentValue) => ({ ...currentValue, type })),
        onToggleFilters,
        onDayPress,
        onApplyFilters,
        onClearFilters,
    };
};
