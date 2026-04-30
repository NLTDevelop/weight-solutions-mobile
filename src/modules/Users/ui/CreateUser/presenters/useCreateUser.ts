import { usersService } from '@/entities/Users/UsersService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateUserUi } from './useCreateUserUi';

interface IRouteParams {
    companyId: number;
}

export const useCreateUser = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { companyId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, usernameErrorText, emailErrorText, passwordErrorText, descriptionErrorText, isSubmitDisabled } = useCreateUserUi({
        name,
        username,
        email,
        password,
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

        const response = await usersService.create({
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
            password: password.trim(),
            description: description.trim(),
            company_id: companyId,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('User creation failed', response.message || 'Please try again');
            return;
        }

        toastService.showSuccess('User created', response.data.data.name);
        navigation.replace('UserView', { companyId, userId: response.data.data.id });
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
        passwordErrorText,
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
