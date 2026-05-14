import { IOrder } from '@/entities/Order/IOrder';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { formatWeighingDateTime, getFirstWeighingItem, getNetWeightValue, getSecondWeighingItem, getWeighingActionTranslationKey, getWeighingStatus } from '@/modules/Weighing/utils/weight';

interface IProps {
    orders: IOrder[];
    onPressWeighing: (orderId: number) => void;
    onPressWeighingAction: (orderId: number) => void;
}

export const useWeighingsUi = ({ orders, onPressWeighing, onPressWeighingAction }: IProps) => {
    const weighingCards: IWeighingCardItem[] = orders.map(order => ({
        id: order.id,
        recordNumber: `#${order.id}`,
        productName: order.product?.name || 'weighings.productFallback',
        carNumber: order.car_number,
        netWeight: getNetWeightValue(order),
        firstWeighingAt: formatWeighingDateTime(getFirstWeighingItem(order)?.created_at || order.first_weight_at || order.created_at),
        secondWeighingAt: formatWeighingDateTime(getSecondWeighingItem(order)?.created_at || order.second_weight_at || order.updated_at),
        status: getWeighingStatus(order),
        actionLabel: getWeighingActionTranslationKey(order),
        onActionPress: () => onPressWeighingAction(order.id),
        onPress: () => onPressWeighing(order.id),
    }));

    return {
        weighingCards,
    };
};
