import { usersService } from '@/entities/Users/UsersService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateUserUi } from './useCreateUserUi';
import { companyService } from '@/entities/Company/CompanyService';
import { useUiContext } from '@/UIProvider';

interface IRouteParams {
    companyId: number;
}

export const useCreateUser = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { companyId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<'admin' | 'user'>('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, phoneErrorText, roleErrorText, emailErrorText, passwordErrorText, descriptionErrorText, isSubmitDisabled } = useCreateUserUi({
        name,
        phone,
        role,
        email,
        password,
        description,
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

    const onChangePassword = (value: string) => {
        setPassword(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

    const onToggleRole = () => {
        setRole(previousValue => previousValue === 'admin' ? 'user' : 'admin');
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

        const response = await usersService.create({
            name: name.trim(),
            username: email.trim(),
            email: email.trim(),
            password: password.trim(),
            description: description.trim(),
            company_id: companyId,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('users.createdFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        companyService.details(companyId);
        toastService.showSuccess(t('users.created'), response.data.data.name);
        navigation.replace('UserView', { companyId, userId: response.data.data.id });
    };

    return {
        name,
        phone,
        role,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        phoneErrorText,
        roleErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangePhone,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
        onToggleRole,
        onPressBack,
        onSubmit,
    };
};
