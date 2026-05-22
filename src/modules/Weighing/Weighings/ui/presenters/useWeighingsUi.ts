import { IOrder } from '@/entities/Order/IOrder';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { formatWeighingDateTime, getFirstWeighingItem, getNetWeightValue, getSecondWeighingItem, getWeighingActionTranslationKey, getWeighingStatus } from '@/modules/Weighing/utils/weight';

interface IProps {
    orders: IOrder[];
    status: OrderListDtoStatusEnum;
    onPressWeighing: (orderId: number) => void;
    onPressWeighingAction: (orderId: number) => void;
}

const isOrderVisibleForStatus = (order: IOrder, status: OrderListDtoStatusEnum) => {
    const weighingStatus = getWeighingStatus(order);

    return status === OrderListDtoStatusEnum.ARCHIVE
        ? weighingStatus === 'completed'
        : weighingStatus === 'active';
};

export const useWeighingsUi = ({ orders, status, onPressWeighing, onPressWeighingAction }: IProps) => {
    const weighingCards: IWeighingCardItem[] = orders
        .filter(order => isOrderVisibleForStatus(order, status))
        .map((order) => {
            const secondWeightCreatedAt =  getSecondWeighingItem(order)?.created_at;
            return {
            id: order.id,
            recordNumber: `№ ${order.id}`,
            productName: order.product?.name || 'weighings.productFallback',
            carNumber: order.car_number,
            netWeight: getNetWeightValue(order),
            firstWeighingAt: formatWeighingDateTime(getFirstWeighingItem(order)?.created_at),
            secondWeighingAt: (secondWeightCreatedAt === null || secondWeightCreatedAt === undefined ? null : secondWeightCreatedAt),
            status: getWeighingStatus(order),
            actionLabel: getWeighingActionTranslationKey(order),
            onActionPress: () => onPressWeighingAction(order.id),
            onPress: () => onPressWeighing(order.id)
            };
        });

    return {
        weighingCards,
    };
};
