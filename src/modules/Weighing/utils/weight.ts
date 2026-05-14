import { IOrder, IOrderItem } from '@/entities/Order/IOrder';

const SECOND_WEIGHT_TYPES = ['gross', 'brutto', 'weight_before'];
const FIRST_WEIGHT_TYPES = ['tare', 'tara', 'weight_after'];

export const formatWeighingDateTime = (value?: string | null) => {
    if (!value) {
        return 'weighings.fallbacks.unavailable';
    }

    return new Date(value).toLocaleString('uk-UA');
};

export const getWeightNumberValue = (value?: string | null) => {
    const parsedValue = Number(String(value || '').replace(',', '.'));
    return Number.isFinite(parsedValue) ? parsedValue : null;
};

const findItemByType = (items: IOrderItem[] | null | undefined, types: string[]) => {
    return items?.find(item => {
        const normalizedType = item.weight_type?.toLowerCase?.() || '';
        return types.includes(normalizedType);
    }) || null;
};

export const getFirstWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return findItemByType(order.items, FIRST_WEIGHT_TYPES) || order.items?.[0] || null;
};

export const getSecondWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return findItemByType(order.items, SECOND_WEIGHT_TYPES) || order.items?.[1] || null;
};

export const getNetWeightValue = (order: IOrder | null) => {
    const firstValue = getWeightNumberValue(getFirstWeighingItem(order)?.weight || order?.weight_after);
    const secondValue = getWeightNumberValue(getSecondWeighingItem(order)?.weight || order?.weight_before);

    if (firstValue === null || secondValue === null) {
        return 'weighings.fallbacks.unavailable';
    }

    return `${secondValue - firstValue}`;
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
