import { usersService } from '@/entities/Users/UsersService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateUserUi } from './useCreateUserUi';
import { companyService } from '@/entities/Company/CompanyService';
import { useUiContext } from '@/UIProvider';
import { userModel } from '@/entities/User/UserModel';
import { companyModel } from '@/entities/Company/CompanyModel';

export const useCreateUser = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [role, setRole] = useState<'admin' | 'user'>('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, emailErrorText, passwordErrorText, descriptionErrorText, isSubmitDisabled }
        = useCreateUserUi({ name, role, email, password, description, isSubmitted, isLoading, });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeRole = (value: 'admin' | 'user') => {
        setRole(value);
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

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled || !userModel.user?.company?.id) {
            return;
        }

        setIsLoading(true);

        const response = await usersService.create({
            name: name.trim(),
            role,
            username: email.trim(),
            email: email.trim(),
            password: password.trim(),
            description: description.trim(),
            company_id: userModel.user?.company?.id
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('users.createdFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        const companyId = userModel.user?.company?.id || companyModel.company?.id;
        if (companyId) {
            companyService.details(companyId);
        }
        toastService.showSuccess(t('users.created'), response.data.data.name);
        navigation.goBack();
    };

    return {
        name,
        role,
        email,
        password,
        description,
        isLoading,
        nameErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeRole,
        onChangeEmail,
        onChangePassword,
        onChangeDescription,
        onSubmit,
    };
};
