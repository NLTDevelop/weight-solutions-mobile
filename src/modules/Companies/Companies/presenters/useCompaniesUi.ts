import { ICompany } from '@/entities/Company/ICompany';
import { useUiContext } from '@/UIProvider';

interface IProps {
    companies: ICompany[];
    onPressCompany: (companyId: number) => void;
}

export interface ICompanyCardItem {
    id: number;
    title: string;
    addressLabel: string;
    addressValue: string;
    ownerLabel: string;
    ownerValue: string;
    phoneLabel: string;
    phoneValue: string;
    onPress: () => void;
}

export const useCompaniesUi = ({ companies, onPressCompany }: IProps) => {
    const { t } = useUiContext();

    const companyCards: ICompanyCardItem[] = companies.map(company => ({
        id: company.id,
        title: company.name,
        addressLabel: t('companies.addressLabel'),
        addressValue: company.description || t('companies.addressFallback'),
        ownerLabel: t('companies.ownerLabel'),
        ownerValue:
            company.users?.find(user => user.role === 'admin')?.name
            || company.users?.find(user => user.role === 'admin')?.username
            || company.users?.[0]?.name
            || company.users?.[0]?.username
            || t('companies.ownerFallback'),
        phoneLabel: t('companies.phoneLabel'),
        phoneValue: company.contact || t('companies.phoneFallback'),
        onPress: () => onPressCompany(company.id),
    }));

    return {
        companyCards,
    };
};
