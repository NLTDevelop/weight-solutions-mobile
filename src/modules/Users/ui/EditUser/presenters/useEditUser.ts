import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useEditUserUi } from './useEditUserUi';
import { usersModel } from '@/entities/Users/UsersModel';
import { usersService } from '@/entities/Users/UsersService';
import { UserUpdateDto } from '@/entities/Users/dto/user-update.dto';
import { companyService } from '@/entities/Company/CompanyService';
import { userModel } from '@/entities/User/UserModel';
import { useUiContext } from '@/UIProvider';
import { companyModel } from '@/entities/Company/CompanyModel';

interface IRouteParams {
    userId: number;
}

export const useEditUser = () => {
    const { t } = useUiContext();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { userId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(userModel.user?.role === 'superadmin' ? 'admin' : 'user');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const hydrateUser = useCallback(async () => {
        setIsLoading(true);
        const response = await usersService.details(userId);
        setIsLoading(false);
        if (response.isError || !response.data?.data) {
            toastService.showError('User loading failed', response.message || 'Please try again');
            return;
        }

        setName(response.data.data.name || '');
        setEmail(response.data.data.email || '');
        response.data.data.role && setRole(response.data.data.role);
        setDescription(response.data.data.description || '');
    }, [userId]);

    useEffect(() => {
        hydrateUser();
    }, [hydrateUser, userId]);

    const { nameErrorText, emailErrorText, isSubmitDisabled } = useEditUserUi({
        name,
        email,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeEmail = (value: string) => {
        setEmail(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const body: Partial<UserUpdateDto> = {
            name: name.trim(),
            username: email.trim(),
            email: email.trim(),
            description: description.trim(),
            active: usersModel.current?.status === 'active',
        };

        const response = await usersService.update(userId, body);

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('profile.updateFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('profile.updated'), response.data.data.name);
        const companyId = usersModel.current?.company?.id || userModel.user?.company?.id || companyModel.company?.id;
        if (companyId) {
            companyService.details(companyId);
        }
        navigation.goBack();
    };

    return {
        name,
        role,
        email,
        description,
        isLoading,
        nameErrorText,
        emailErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeEmail,
        onChangeDescription,
        onPressBack,
        onSubmit,
    };
};
