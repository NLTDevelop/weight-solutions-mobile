export interface IWeighingCardItem {
    id: number;
    recordNumber: string;
    productName: string;
    carNumber: string;
    netWeight: string;
    status: 'completed' | 'suspicious';
    createdAt: string;
    onPress: () => void;
}
