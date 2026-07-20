import { IOrder } from '@/entities/Order/IOrder';
import { orderModel } from '@/entities/Order/OrderModel';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { formatWeighingDateTime, getFirstWeighingItem, getNetWeightValue, getSecondWeighingItem, getWeighingActionTranslationKey, getWeighingDisplayStatus } from '@/modules/Weighing/utils/weight';

interface IProps {
    orders: IOrder[];
    onPressWeighing: (order: IOrder) => void;
    onPressWeighingAction: (order: IOrder) => void;
}

export const useWeighingsUi = ({ orders, onPressWeighing, onPressWeighingAction }: IProps) => {
    const isGuest = orderModel.isGuest;

    const weighingCards: IWeighingCardItem[] = orders
        .filter((order) => isGuest as any === order.is_guest || String(isGuest) === order.is_guest)
        .map((order) => {
            const secondWeightCreatedAt = getSecondWeighingItem(order)?.created_at;
            return {
                id: order.id,
                recordNumber: `№ ${order.id}`,
                productName: order.product?.name || 'weighings.productFallback',
                carNumber: order.car_number,
                netWeight: getNetWeightValue(order),
                firstWeighingAt: formatWeighingDateTime(getFirstWeighingItem(order)?.created_at),
                secondWeighingAt: (secondWeightCreatedAt === null || secondWeightCreatedAt === undefined ? null : formatWeighingDateTime(secondWeightCreatedAt)),
                status: order.status || getWeighingDisplayStatus(order),
                actionLabel: getWeighingActionTranslationKey(order),
                onActionPress: () => onPressWeighingAction(order),
                onPress: () => onPressWeighing(order)
            };
        });

    return {
        weighingCards,
    };
};
