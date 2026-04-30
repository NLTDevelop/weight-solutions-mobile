import { ICompany } from '@/entities/Company/ICompany';

interface IProps {
    companies: ICompany[];
    onPressCompany: (companyId: number) => void;
}

export interface ICompanyCardItem {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    statusText: string;
    onPress: () => void;
}

export const useCompaniesUi = ({ companies, onPressCompany }: IProps) => {
    const companyCards: ICompanyCardItem[] = companies.map(company => ({
        id: company.id,
        title: company.name,
        subtitle: company.contact || 'No contact specified',
        description: company.description || 'No description specified',
        statusText: company.status,
        onPress: () => onPressCompany(company.id),
    }));

    return {
        companyCards,
    };
};
