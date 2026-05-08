import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useCompanyUi } from './useCompanyUi';

interface IRouteParams {
    companyId: number;
}

export const useCompany = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const { companyId } = route.params as IRouteParams;

    const onPressUser = useCallback((userId: number) => {
        navigation.navigate('UserView', { companyId, userId });
    }, [companyId, navigation]);

    const onPressEditUser = useCallback((userId: number) => {
        navigation.navigate('EditUserView', { companyId, userId });
    }, [companyId, navigation]);

    const { infoRows, userCards } = useCompanyUi({
        company: companyModel.company,
        t,
        onPressUser,
        onPressEditUser,
    });

    const loadCompany = useCallback(async () => {
        setIsLoading(true);

        const response = await companyService.details(companyId);

        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('companies.сompaniesLoadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [companyId, t]);

    const onPressBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        loadCompany();
    }, [loadCompany]);

    const onGoToCreateUser = useCallback(() => {
        navigation.navigate('CreateUserView', { companyId });
    }, [companyId, navigation]);

    const onPressEditCompany = useCallback(() => {
        navigation.navigate('EditCompanyView', { companyId });
    }, [companyId, navigation]);

    return {
        company: companyModel.company,
        infoRows,
        userCards,
        isLoading,
        onPressBack,
        onGoToCreateUser,
        onPressEditCompany,
    };
};
