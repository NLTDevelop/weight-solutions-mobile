export interface IWeighingCardItem {
    id: number;
    recordNumber: string;
    productName: string;
    carNumber: string;
    netWeight: string;
    firstWeighingAt: string;
    secondWeighingAt: string;
    status: 'active' | 'completed';
    actionLabel: string;
    onActionPress: () => void;
    onPress: () => void;
}
