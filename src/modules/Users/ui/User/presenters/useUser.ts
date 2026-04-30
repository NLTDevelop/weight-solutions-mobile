import { usersModel } from '@/entities/Users/UsersModel';
import { toastService } from '@/libs/toast/toastService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { useUserUi } from './useUserUi';
import { usersService } from '@/entities/Users/UsersService';

interface IRouteParams {
    companyId: number;
    userId: number;
}

export const useUser = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { companyId, userId } = route.params as IRouteParams;
    const [isLoading, setIsLoading] = useState(false);

    const { infoRows } = useUserUi({
        user: usersModel.current,
    });

    const loadUser = useCallback(async () => {
        setIsLoading(true);

        const response = await usersService.details(companyId, userId);

        setIsLoading(false);

        if (response.isError) {
            toastService.showError('User loading failed', response.message || 'Please try again');
        }
    }, [companyId, userId]);

    useFocusEffect(useCallback(() => {
        loadUser();
    }, [loadUser]));

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditUserView', { companyId, userId });
    };

    return {
        user: usersModel.current,
        infoRows,
        isLoading,
        onPressBack,
        onPressEdit,
    };
};
