import { userModel } from '@/entities/User/UserModel';

interface IProps {
    onOpenCompany: (companyId: number) => void;
}

export const useLinkedObjectsUi = ({ onOpenCompany }: IProps) => {
    const company = userModel.user?.company;

    const linkedCompany = company
        ? {
            title: company.name,
            subtitle: company.contact || '-',
            description: company.description || '-',
            onPress: () => onOpenCompany(company.id),
        }
        : null;

    return {
        linkedCompany,
    };
};
