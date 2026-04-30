export interface IProfileMenuItem {
    id: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    isDestructive?: boolean;
}
