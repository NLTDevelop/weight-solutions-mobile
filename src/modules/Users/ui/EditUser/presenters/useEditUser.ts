import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useEditUserUi } from './useEditUserUi';
import { usersModel } from '@/entities/Users/UsersModel';
import { usersService } from '@/entities/Users/UsersService';
import { useUiContext } from '@/UIProvider';

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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const hydrateUser = useCallback(async () => {
        setIsLoading(true);

        const response = await usersService.details(companyId, userId);

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('User loading failed', response.message || 'Please try again');
            return;
        }

        setName(response.data.data.name || '');
        setUsername(response.data.data.username || '');
        setEmail(response.data.data.email || '');
        setDescription(response.data.data.description || '');
    }, [companyId, userId]);

    useEffect(() => {
        if (usersModel.current?.id === userId) {
            setName(usersModel.current.name || '');
            setUsername(usersModel.current.username || '');
            setEmail(usersModel.current.email || '');
            setDescription(usersModel.current.description || '');
            return;
        }

        hydrateUser();
    }, [hydrateUser, userId]);

    const { nameErrorText, usernameErrorText, emailErrorText, descriptionErrorText, isSubmitDisabled } = useEditUserUi({
        name,
        username,
        email,
        description,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeUsername = (value: string) => {
        setUsername(value);
    };

    const onChangeEmail = (value: string) => {
        setEmail(value);
    };

    const onChangePassword = (value: string) => {
        setPassword(value);
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

        const response = await usersService.update(userId, {
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
            description: description.trim(),
            company_id: companyId,
            active: usersModel.current?.status === 'active',
            password: password.trim() ? password.trim() : null,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('profile.updateFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('profile.updated'), response.data.data.name);
        navigation.replace('UserView', { companyId, userId });
    };

    return {
        name,
        username,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        usernameErrorText,
        emailErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeUsername,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
        onPressBack,
        onSubmit,
    };
};
