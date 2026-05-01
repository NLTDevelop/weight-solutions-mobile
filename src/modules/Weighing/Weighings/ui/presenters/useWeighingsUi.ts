import { IOrder } from '@/entities/Order/IOrder';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';

interface IProps {
    orders: IOrder[];
    onPressWeighing: (orderId: number) => void;
}

const formatDateTime = (value?: string | null) => {
    if (!value) {
        return 'weighings.fallbacks.unavailable';
    }

    return new Date(value).toLocaleString('uk-UA');
};

const getNumberValue = (value?: string | null) => {
    const parsedValue = Number(String(value || '').replace(',', '.'));
    return Number.isFinite(parsedValue) ? parsedValue : null;
};

const getNetWeightValue = (weightBefore?: string | null, weightAfter?: string | null) => {
    const weightBeforeValue = getNumberValue(weightBefore);
    const weightAfterValue = getNumberValue(weightAfter);

    if (weightBeforeValue === null || weightAfterValue === null) {
        return 'weighings.fallbacks.unavailable';
    }

    return String(weightBeforeValue - weightAfterValue);
};

const getStatusValue = (weightBefore?: string | null, weightAfter?: string | null) => {
    const netWeightValue = getNumberValue(getNetWeightValue(weightBefore, weightAfter));

    if (netWeightValue !== null && netWeightValue <= 0) {
        return 'suspicious' as const;
    }

    return 'completed' as const;
};

export const useWeighingsUi = ({ orders, onPressWeighing }: IProps) => {
    const weighingCards: IWeighingCardItem[] = orders.map(order => ({
        id: order.id,
        recordNumber: `#${order.id}`,
        productName: order.product?.name || 'weighings.productFallback',
        carNumber: order.car_number,
        netWeight: getNetWeightValue(order.weight_before, order.weight_after),
        status: getStatusValue(order.weight_before, order.weight_after),
        createdAt: formatDateTime(order.created_at),
        onPress: () => onPressWeighing(order.id),
    }));

    return {
        weighingCards,
    };
};
