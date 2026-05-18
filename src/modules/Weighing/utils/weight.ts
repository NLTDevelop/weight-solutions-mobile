import { IOrder } from '@/entities/Order/IOrder';


export const formatWeighingDateTime = (value?: string | null) => {
    if (!value) {
        return 'weighings.fallbacks.notPerformed';
    }

    return new Date(value).toLocaleString('uk-UA');
};

export const getWeightNumberValue = (value?: string | null) => {
    if(value === null){
        return value;
    }
    const parsedValue = Number(String(value).replace(',', '.'));
    return Number.isFinite(parsedValue) ? parsedValue : null;
};

export const getFirstWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return order.items?.[0];
};

export const getSecondWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return (order.items?.length ?? 0) > 1 ? order.items?.[order.items.length - 1] : null;
};

export const getNetWeightValue = (order: IOrder | null) => {
    const firstValue = getWeightNumberValue(getFirstWeighingItem(order)?.weight);
    const secondValue = getWeightNumberValue(getSecondWeighingItem(order)?.weight);

    if (firstValue === null || secondValue === null) {
        return 'weighings.fallbacks.notPerformed';
    }

    return order!.type === 'loading' ? `${secondValue - firstValue}` : `${firstValue - secondValue}`;
};

export const getWeighingStatus = (order: IOrder | null) => {
    const normalizedStatus = order?.status?.toLowerCase?.();

    if (normalizedStatus === 'completed') {
        return 'completed' as const;
    }

    if (normalizedStatus === 'active') {
        return 'active' as const;
    }

    if (getSecondWeighingItem(order)) {
        return 'completed' as const;
    }

    return 'active' as const;
};

export const canAddSecondWeighing = (order: IOrder | null) => {
    if (!order) {
        return false;
    }

    const weightCount = order.weight_count || 0;
    const itemsCount = order.items?.length || 0;

    if (getWeighingStatus(order) !== 'active') {
        return false;
    }

    return itemsCount < Math.max(weightCount, 2);
};

export const getWeighingActionTranslationKey = (order: IOrder | null) => {
    return canAddSecondWeighing(order)
        ? 'weighings.completeSecondWeightButton'
        : 'weighings.editButton';
};
