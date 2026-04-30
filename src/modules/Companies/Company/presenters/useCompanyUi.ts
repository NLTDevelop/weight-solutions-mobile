import { ICompany } from '@/entities/Company/ICompany';
import { ICompanyUserCard } from '../types/ICompanyUserCard';

interface ICompanyInfoRow {
    id: string;
    label: string;
    value: string;
}

interface IProps {
    company: ICompany | null;
    onPressUser: (userId: number) => void;
}

export const useCompanyUi = ({ company, onPressUser }: IProps) => {
    const infoRows: ICompanyInfoRow[] = [
        {
            id: 'contact',
            label: 'company.contact',
            value: company?.contact || 'company.contactFallback',
        },
        {
            id: 'description',
            label: 'company.description',
            value: company?.description || 'company.descriptionFallback',
        },
        {
            id: 'status',
            label: 'company.status',
            value: company?.status || '-',
        },
    ];

    const userCards: ICompanyUserCard[] = (company?.users || []).map(user => ({
        id: user.id,
        title: user.name,
        subtitle: user.email,
        status: user.status,
        onPress: () => onPressUser(user.id),
    }));

    return {
        infoRows,
        userCards,
    };
};
