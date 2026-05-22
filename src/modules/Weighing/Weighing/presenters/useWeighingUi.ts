import { IOrder } from '@/entities/Order/IOrder';
import { IUser } from '@/entities/User/IUser';
import { formatWeighingDateTime, getFirstWeighingItem, getNetWeightValue, getSecondWeighingItem, getWeighingActionTranslationKey, getWeighingStatus } from '@/modules/Weighing/utils/weight';

interface ISectionRow {
    id: string;
    label: string;
    value: string;
}

interface ISection {
    id: string;
    title: string;
    rows: ISectionRow[];
}

interface IProps {
    order: IOrder | null;
    user: IUser | null;
}

const withFallback = (value?: string | null) => value || '';

export const useWeighingUi = ({ order, user }: IProps) => {
    const firstItem = getFirstWeighingItem(order);
    const secondItem = getSecondWeighingItem(order);

    const sections: ISection[] = [
        {
            id: 'base',
            title: 'weighings.baseInfoTitle',
            rows: [
                { id: 'phone', label: 'weighings.phoneLabel', value: withFallback(order?.car_phone) },
                { id: 'product', label: 'weighings.cargoTypeLabelShort', value: order?.product?.name || 'weighings.productFallback' },
                { id: 'carNumber', label: 'weighings.carNumberLabel', value: withFallback(order?.car_number) },
                { id: 'weightPoint', label: 'weighings.weightPoint', value: user?.name ?? ''},
                { id: 'movementType', label: 'weighings.movementTypeLabel', value: order?.type ? `weighings.movementTypes.${order.type}` : 'weighings.fallbacks.unavailable' },
                { id: 'netWeight', label: 'weighings.netWeightLabel', value: getNetWeightValue(order) },
                { id: 'comment', label: 'weighings.commentLabel', value: withFallback(order?.comment) },
            ],
        },
        {
            id: 'first',
            title: 'weighings.firstWeighingSectionTitle',
            rows: [
                { id: 'firstDate', label: 'weighings.firstWeightDateTimeLabel', value: formatWeighingDateTime(firstItem?.created_at || order?.created_at) },
                { id: 'firstWeight', label: 'weighings.tareWeightLabel', value: withFallback(firstItem?.weight) },
            ],
        },
        {
            id: 'second',
            title: 'weighings.secondWeighingSectionTitle',
            rows: [
                { id: 'secondDate', label: 'weighings.secondWeightDateTimeLabel', value: secondItem ? formatWeighingDateTime(secondItem.created_at || order?.updated_at) : 'weighings.fallbacks.notPerformed' },
                { id: 'secondWeight', label: 'weighings.grossWeightLabel', value: secondItem ? withFallback(secondItem.weight) : 'weighings.fallbacks.notPerformed' },
            ],
        },
    ];

    if(secondItem !== null){
        sections[1].rows.push({ id: 'firstNetWeight', label: 'weighings.netWeightLabel', value: getNetWeightValue(order) },);
    }


    return {
        sections,
        status: getWeighingStatus(order),
        actionLabel: getWeighingActionTranslationKey(order),
    };
};
