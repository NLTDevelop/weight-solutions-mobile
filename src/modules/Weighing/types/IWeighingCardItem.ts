export interface IWeighingCardItem {
    id: number;
    recordNumber: string;
    productName: string;
    carNumber: string;
    netWeight: string;
    firstWeighingAt: string;
    secondWeighingAt: string | null;
    status: 'active' | 'archive' | 'not_synchronized' | string;
    actionLabel: string;
    onActionPress: () => void;
    onPress: () => void;
}
