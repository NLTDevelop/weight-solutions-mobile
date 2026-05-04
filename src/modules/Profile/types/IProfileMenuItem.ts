export interface IProfileMenuItem {
    id: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    isDestructive?: boolean;
    icon: 'user' | 'bell' | 'dashboard' | 'logout' | 'trash';
    trailingType?: 'chevron' | 'toggle';
    isToggleActive?: boolean;
}
