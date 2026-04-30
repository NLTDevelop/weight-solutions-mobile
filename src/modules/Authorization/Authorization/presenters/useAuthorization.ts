import { userService } from '@/entities/User/UserService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useAuthorizationScreenUi } from './useAuthorizationScreenUi';

export const useAuthorization = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { isSubmitDisabled, usernameErrorText, passwordErrorText } = useAuthorizationScreenUi({
        username,
        password,
        isLoading,
        isUsernameTouched,
        isPasswordTouched,
        isSubmitted,
    });

    const onChangeUsername = (value: string) => {
        setUsername(value);
    };

    const onChangePassword = (value: string) => {
        setPassword(value);
    };

    const onBlurUsername = () => {
        setIsUsernameTouched(true);
    };

    const onBlurPassword = () => {
        setIsPasswordTouched(true);
    };

    const onSubmit = async () => {
        setIsSubmitted(true);
        setIsUsernameTouched(true);
        setIsPasswordTouched(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const response = await userService.signIn({
            username: username.trim(),
            password,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('Authorization failed', response.message || 'Check your credentials and try again');
            return;
        }

        setPassword('');
        toastService.showSuccess('Authorization successful', `Hello, ${response.data.data.name}`);
        navigation.reset({ index: 0, routes: [{ name: 'TabNavigator', params: { screen: 'HomeView' } }] });
    };

    return {
        username,
        password,
        isLoading,
        isSubmitDisabled,
        usernameErrorText,
        passwordErrorText,
        onChangeUsername,
        onChangePassword,
        onBlurUsername,
        onBlurPassword,
        onSubmit,
    };
};
