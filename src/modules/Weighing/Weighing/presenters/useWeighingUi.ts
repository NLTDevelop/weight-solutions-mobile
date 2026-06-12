import { IOrder } from '@/entities/Order/IOrder';
import { IUser } from '@/entities/User/IUser';
import { formatWeighingDateTime, formatWeightValue, getFirstWeighingItem, getFirstWeighingType, getIntermediateWeighingItems, getNetWeightValue, getSecondWeighingItem, getSecondWeighingType, getWeighingActionTranslationKey, getWeighingDisplayStatus } from '@/modules/Weighing/utils/weight';

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
    const firstWeightType = getFirstWeighingType(order);
    const secondWeightType = getSecondWeighingType(order);
    const intermediateItems = getIntermediateWeighingItems(order);
    const sections: ISection[] = [
        {
            id: 'base',
            title: 'weighings.baseInfoTitle',
            rows: [
                { id: 'phone', label: 'weighings.phoneLabel', value: withFallback(order?.car_phone) },
                { id: 'product', label: 'weighings.cargoTypeLabelShort', value: order?.product?.name || 'weighings.productFallback' },
                { id: 'carNumber', label: 'weighings.carNumberLabel', value: withFallback(order?.car_number) },
                { id: 'movementType', label: 'weighings.movementTypeLabel', value: order?.type ? `weighings.movementTypes.${order.type}` : 'weighings.fallbacks.unavailable' },
                { id: 'netWeight', label: 'weighings.netWeightLabel', value: getNetWeightValue(order) },
            ],
        },
        {
            id: 'first',
            title: 'weighings.firstWeighingSectionTitle',
            rows: [
                { id: 'firstDate', label: 'weighings.firstWeightDateTimeLabel', value: formatWeighingDateTime(firstItem?.created_at || order?.created_at) },
                { id: 'firstWeight', label: `weighings.weightTypesLabels.${firstWeightType}`, value: formatWeightValue(firstItem?.weight) },
            ],
        },
    ];

    if (order?.comment) {
        sections[0].rows.push({ id: 'comment', label: 'weighings.commentLabel', value: withFallback(order?.comment) });
    }

    if (secondItem) {
        sections.push({
            id: 'second',
            title: 'weighings.secondWeighingSectionTitle',
            rows: [
                {
                    id: 'secondDate',
                    label: 'weighings.secondWeightDateTimeLabel',
                    value: secondItem ? formatWeighingDateTime(secondItem.created_at || order?.updated_at) : 'weighings.fallbacks.notPerformed',
                },
                {
                    id: 'secondWeight',
                    label: `weighings.weightTypesLabels.${secondWeightType}`,
                    value: secondItem ? formatWeightValue(secondItem.weight) : 'weighings.fallbacks.notPerformed',
                },
            ],
        })
    }

    if (intermediateItems.length > 0) {
        sections.push({
            id: 'otherWeighings',
            title: 'weighings.otherWeighingsSectionTitle',
            rows: intermediateItems.flatMap((item, index) => ([
                {
                    id: `otherDate-${item.id}`,
                    label: `weighings.otherWeightDateTimeLabel`,
                    value: `${index + 1}. ${formatWeighingDateTime(item.created_at)}`,
                },
                {
                    id: `otherWeight-${item.id}`,
                    label: `weighings.weightTypesLabels.${item.weight_type}`,
                    value: `${index + 1}. ${formatWeightValue(item.weight)}`,
                },
            ])),
        });
    }

    if (secondItem !== null) {
        sections[1].rows.push({ id: 'firstNetWeight', label: 'weighings.netWeightLabel', value: getNetWeightValue(order) },);
    }
    if (user !== null && user.role === 'admin') {
        sections[0].rows.splice(2, 0, { id: 'weightPoint', label: 'weighings.weightPoint', value: order?.user?.name ?? '' });
    }

    return {
        sections,
        status: getWeighingDisplayStatus(order),
        actionLabel: getWeighingActionTranslationKey(order),
    };
};
