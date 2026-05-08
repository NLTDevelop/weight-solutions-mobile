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

interface IRouteParams {
    companyId: number;
    userId: number;
}

export const useEditUser = () => {
    const { t } = useUiContext();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { companyId, userId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const role = userModel.user?.role === 'superadmin' ? 'admin' : 'user'

    const hydrateUser = useCallback(async () => {
        setIsLoading(true);
        const response = await usersService.details(companyId, userId);
        setIsLoading(false);
        if (response.isError || !response.data?.data) {
            toastService.showError('User loading failed', response.message || 'Please try again');
            return;
        }

        setName(response.data.data.name || '');
        setPhone(response.data.data.contact?.phone || '');
        setEmail(response.data.data.email || '');
    }, [companyId, userId]);

    useEffect(() => {
        hydrateUser();
    }, [hydrateUser, userId]);

    const { nameErrorText, phoneErrorText, emailErrorText, isSubmitDisabled } = useEditUserUi({
        name,
        phone,
        role,
        email,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangePhone = (value: string) => {
        setPhone(value);
    };

    const onChangeEmail = (value: string) => {
        setEmail(value);
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
            description: usersModel.current?.description || null,
            company_id: companyId,
            active: usersModel.current?.status === 'active',
        };

        const response = await usersService.update(userId, body);

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('profile.updateFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('profile.updated'), response.data.data.name);
        companyService.details(companyId);
        navigation.goBack();
    };

    return {
        name,
        phone,
        role,
        email,
        isLoading,
        nameErrorText,
        phoneErrorText,
        emailErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangePhone,
        onChangeEmail,
        onPressBack,
        onSubmit,
    };
};
