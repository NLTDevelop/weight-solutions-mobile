import { IOrder } from '@/entities/Order/IOrder';
import { IOrderItem } from '@/entities/Order/IOrder';
import { getPrimaryWeightType, getSecondaryWeightType, WeightType } from '@/entities/Order/types';


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

const getLatestWeighingItemByType = (order: IOrder | null, weightType: WeightType) => {
    if (!order?.items?.length) {
        return null;
    }

    for (let index = order.items.length - 1; index >= 0; index -= 1) {
        const item = order.items[index];

        if (item.weight_type === weightType) {
            return item;
        }
    }

    return null;
};

const getItemsWithoutSelected = (items: IOrderItem[], selectedItems: Array<IOrderItem | null>) => {
    const selectedIds = new Set(selectedItems.filter(Boolean).map(item => item!.id));
    return items.filter(item => !selectedIds.has(item.id));
};

export const getFirstWeighingType = (order: IOrder | null) => getPrimaryWeightType(order?.type);

export const getSecondWeighingType = (order: IOrder | null) => getSecondaryWeightType(order?.type);

export const getFirstWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return getLatestWeighingItemByType(order, getFirstWeighingType(order));
};

export const getSecondWeighingItem = (order: IOrder | null) => {
    if (!order) {
        return null;
    }

    return getLatestWeighingItemByType(order, getSecondWeighingType(order));
};

export const getIntermediateWeighingItems = (order: IOrder | null) => {
    if (!order?.items?.length) {
        return [];
    }

    return getItemsWithoutSelected(order.items, [
        getFirstWeighingItem(order),
        getSecondWeighingItem(order),
    ]);
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
        return 'archive' as const;
    }

    return 'active' as const;
};

export const getWeighingDisplayStatus = (order: IOrder | null) => {
    if (order?.isSyncedWithServer === false) {
        return 'not_synchronized' as const;
    }

    return getWeighingStatus(order);
};

export const canAddSecondWeighing = (order: IOrder | null) => {
    if (!order) {
        return false;
    }

    if (getWeighingStatus(order) !== 'active') {
        return false;
    }

    return getSecondWeighingItem(order) === null;
};

export const getWeighingActionTranslationKey = (order: IOrder | null) => {
    return canAddSecondWeighing(order)
        ? 'weighings.completeSecondWeightButton'
        : 'weighings.editButton';
};
