export interface ICompanyUserCard {
    id: number;
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    onPress: () => void;
    onPressEdit: () => void;
}
