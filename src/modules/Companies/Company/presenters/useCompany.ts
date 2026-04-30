import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useCompanyUi } from './useCompanyUi';

interface IRouteParams {
    companyId: number;
}

export const useCompany = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(false);
    const { companyId } = route.params as IRouteParams;

    const onPressUser = useCallback((userId: number) => {
        navigation.navigate('UserView', { companyId, userId });
    }, [companyId, navigation]);

    const { infoRows, userCards } = useCompanyUi({
        company: companyModel.company,
        onPressUser,
    });

    const loadCompany = useCallback(async () => {
        setIsLoading(true);

        const response = await companyService.details(companyId);

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Company loading failed', response.message || 'Please try again');
        }
    }, [companyId]);

    const onPressBack = () => {
        navigation.goBack();
    };

    useFocusEffect(useCallback(() => {
        loadCompany();
    }, [loadCompany]));

    const onGoToCreateUser = useCallback(() => {
        navigation.navigate('CreateUserView', { companyId });
    }, [companyId, navigation]);

    return {
        company: companyModel.company,
        infoRows,
        userCards,
        isLoading,
        onPressBack,
        onGoToCreateUser,
    };
};
