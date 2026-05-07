import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useCompaniesUi } from './useCompaniesUi';

const LIST_LIMIT = 20;
const SEARCH_DEBOUNCE_MS = 300;

export const useCompanies = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const onPressCompany = (companyId: number) => {
        navigation.navigate('CompanyView', { companyId });
    };

    const { companyCards } = useCompaniesUi({
        companies: companyModel.companies,
        onPressCompany,
    });

    const loadCompanies = useCallback(async (offset: number = 0, searchValue = search) => {
        setIsLoading(true);

        const normalizedSearch = searchValue.trim();
        const response = await companyService.list({
            limit: LIST_LIMIT,
            offset: offset,
            status: 'active',
            name: normalizedSearch || undefined,
        });

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Companies loading failed', response.message || 'Please try again');
        }
    }, [search]);

    const onPressCreateCompany = () => {
        navigation.navigate('CreateCompanyView');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadCompanies(0, search);
        }, SEARCH_DEBOUNCE_MS);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadCompanies, search]);

    const onEndReached = async () => {
        if (isLoading || ((companyModel.meta?.total || 0) <= companyModel.companies?.length)) return;
        await loadCompanies(companyModel.meta?.offset, search);
    }

    const onChangeSearch = (value: string) => {
        setSearch(value);
    };

    return {
        onEndReached,
        companyCards,
        isLoading,
        onPressCreateCompany,
        onRefresh: () => loadCompanies(0, search),
        search,
        onChangeSearch,
    };
};
