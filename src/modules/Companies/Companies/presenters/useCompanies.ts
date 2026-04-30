import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useCompaniesUi } from './useCompaniesUi';

const LIST_LIMIT = 20;

export const useCompanies = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);

    const onPressCompany = (companyId: number) => {
        navigation.navigate('CompanyView', { companyId });
    };

    const { companyCards } = useCompaniesUi({
        companies: companyModel.companies,
        onPressCompany,
    });

    const loadCompanies = async () => {
        setIsLoading(true);

        const response = await companyService.list({ limit: LIST_LIMIT, offset: 0, status: 'active', });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Companies loading failed', response.message || 'Please try again');
        }
    };

    const onPressCreateCompany = () => {
        navigation.navigate('CreateCompanyView');
    };

    useEffect(() => {
        loadCompanies();
    }, []);

    return { companyCards, isLoading, onPressCreateCompany, onRefresh: loadCompanies, };
};
