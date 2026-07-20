import { useUiContext } from '@/UIProvider';
import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { ICompanyUserCard } from '@/modules/Companies/Company/types/ICompanyUserCard';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { userModel } from '@/entities/User/UserModel';

export const useUsersManagement = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const companyId = userModel.user?.company?.id;
    const users = companyModel.company?.users;

    const loadUsers = useCallback(async () => {
        if (!companyId) {
            toastService.showError(t('users.loadingFailed'), t('profile.userNotAvailable'));
            return;
        }

        setIsLoading(true);
        const response = await companyService.details(companyId);
        setIsLoading(false);

        if (response.isError || !response.data?.data?.users) {
            toastService.showError(t('users.loadingFailed'), response.message || t('profile.tryAgainPlease'));
        }
    }, [companyId, t]);

    useFocusEffect(useCallback(() => {
        loadUsers();
    }, [loadUsers]));

    const userCards = useMemo<ICompanyUserCard[]>(() => {
        return (users|| [])
            .map(user => ({
                id: user.id,
                title: user.name,
                subtitle: t(`profile.roles.${user.role}`),
                phone: user.contact?.phone || t('users.phoneFallback'),
                email: user.email || '-',
                onPress: () => navigation.navigate('UserView', { userId: user.id }),
                onPressEdit: () => navigation.navigate('EditUserView', { userId: user.id }),
            }));
    }, [navigation, t, users]);

    const onPressCreateUser = () => {
        navigation.navigate('CreateUserView');
    };

    return { userCards, isLoading, onPressCreateUser, };
};
