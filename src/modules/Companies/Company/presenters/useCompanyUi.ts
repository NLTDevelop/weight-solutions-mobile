import { ICompany } from '@/entities/Company/ICompany';
import { ICompanyUserCard } from '../types/ICompanyUserCard';

interface ICompanyInfoRow {
    id: string;
    label: string;
    value: string;
}

interface IProps {
    company: ICompany | null;
    t: (scope: string) => string;
    onPressUser: (userId: number) => void;
    onPressEditUser: (userId: number) => void;
}

export const useCompanyUi = ({ company, t, onPressUser, onPressEditUser }: IProps) => {
    const infoRows: ICompanyInfoRow[] = [
        {
            id: 'address',
            label: t('companies.addressLabel'),
            value: company?.address || t('companies.addressFallback'),
        },
        {
            id: 'owner',
            label: t('companies.ownerLabel'),
            value: company?.contact || t('companies.ownerFallback'),
        },
        {
            id: 'phone',
            label: t('companies.phoneLabel'),
            value: company?.phone || t('companies.phoneFallback'),
        },
        {
            id: 'description',
            label: t('company.description'),
            value: company?.description || t('company.descriptionFallback'),
        },
    ];

    const userCards: ICompanyUserCard[] = (company?.users || []).map(user => ({
        id: user.id,
        title: user.name,
        subtitle: t(`profile.roles.${user.role}`),
        phone: user.contact?.phone || t('users.phoneFallback'),
        email: user.email,
        onPress: () => onPressUser(user.id),
        onPressEdit: () => onPressEditUser(user.id),
    }));

    return {
        infoRows,
        userCards,
    };
};
