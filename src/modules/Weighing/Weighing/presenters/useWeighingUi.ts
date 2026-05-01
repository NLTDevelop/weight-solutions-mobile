import { IOrder } from '@/entities/Order/IOrder';
import { IWeighingInfoRow } from '@/modules/Weighing/types/IWeighingInfoRow';

interface IProps {
    order: IOrder | null;
}

const getNumberValue = (value?: string | null) => {
    const parsedValue = Number(String(value || '').replace(',', '.'));
    return Number.isFinite(parsedValue) ? parsedValue : null;
};

const getDateTimeValue = (value?: string | null) => {
    if (!value) {
        return 'weighings.fallbacks.unavailable';
    }

    return new Date(value).toLocaleString('uk-UA');
};

const getNetWeightValue = (weightBefore?: string | null, weightAfter?: string | null) => {
    const weightBeforeValue = getNumberValue(weightBefore);
    const weightAfterValue = getNumberValue(weightAfter);

    if (weightBeforeValue === null || weightAfterValue === null) {
        return 'weighings.fallbacks.unavailable';
    }

    return String(weightBeforeValue - weightAfterValue);
};

const getStatusValue = (order: IOrder | null) => {
    if (order?.status) {
        return order.status;
    }

    const netWeightValue = getNumberValue(getNetWeightValue(order?.weight_before, order?.weight_after));

    if (order?.suspicious || (netWeightValue !== null && netWeightValue <= 0)) {
        return 'weighings.statuses.suspicious';
    }

    return 'weighings.statuses.completed';
};

const getSuspiciousValue = (order: IOrder | null) => {
    const netWeightValue = getNumberValue(getNetWeightValue(order?.weight_before, order?.weight_after));

    if (order?.suspicious || (netWeightValue !== null && netWeightValue <= 0)) {
        return 'weighings.suspiciousValues.yes';
    }

    return 'weighings.suspiciousValues.no';
};

export const useWeighingUi = ({ order }: IProps) => {
    const infoRows: IWeighingInfoRow[] = [
        {
            id: 'recordNumber',
            label: 'weighings.recordNumberLabel',
            value: order ? `#${order.id}` : 'weighings.fallbacks.unavailable',
        },
        {
            id: 'firstWeightAt',
            label: 'weighings.firstWeightDateTimeLabel',
            value: getDateTimeValue(order?.first_weight_at || order?.created_at),
        },
        {
            id: 'secondWeightAt',
            label: 'weighings.secondWeightDateTimeLabel',
            value: getDateTimeValue(order?.second_weight_at || order?.updated_at),
        },
        {
            id: 'carNumber',
            label: 'weighings.carNumberLabel',
            value: order?.car_number || 'weighings.fallbacks.unavailable',
        },
        {
            id: 'product',
            label: 'weighings.cargoTypeLabel',
            value: order?.product?.name || 'weighings.productFallback',
        },
        {
            id: 'scalePoint',
            label: 'weighings.scalePointLabel',
            value: order?.type || 'weighings.fallbacks.unavailable',
        },
        {
            id: 'grossWeight',
            label: 'weighings.grossWeightLabel',
            value: order?.weight_before || 'weighings.fallbacks.unavailable',
        },
        {
            id: 'tareWeight',
            label: 'weighings.tareWeightLabel',
            value: order?.weight_after || 'weighings.fallbacks.unavailable',
        },
        {
            id: 'netWeight',
            label: 'weighings.netWeightLabel',
            value: getNetWeightValue(order?.weight_before, order?.weight_after),
        },
        {
            id: 'status',
            label: 'weighings.statusLabel',
            value: getStatusValue(order),
        },
        {
            id: 'comment',
            label: 'weighings.commentLabel',
            value: order?.comment || 'weighings.fallbacks.unavailable',
        },
        {
            id: 'suspicious',
            label: 'weighings.suspiciousLabel',
            value: getSuspiciousValue(order),
        },
    ];

    return {
        infoRows,
    };
};
