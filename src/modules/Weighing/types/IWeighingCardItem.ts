export interface IWeighingCardItem {
    id: number;
    recordNumber: string;
    productName: string;
    carNumber: string;
    netWeight: string;
    firstWeighingAt: string;
    secondWeighingAt: string | null;
    status: 'active' | 'completed' | 'not_synchronized';
    actionLabel: string;
    onActionPress: () => void;
    onPress: () => void;
}
