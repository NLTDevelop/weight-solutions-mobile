export interface ISelectableOptionItem {
    id: number;
    title: string;
    description: string;
    isSelected: boolean;
    onPress: () => void;
}
