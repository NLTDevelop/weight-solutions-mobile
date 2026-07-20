import { userService } from '@/entities/User/UserService';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';

export const useAuthorization = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [authErrorText, setAuthErrorText] = useState('');
    const trimmedUsername = username.trim();
    const isSubmitDisabled = isLoading || trimmedUsername.length === 0 || password.length === 0;
    const showPasswordToggle = password.length > 0;

    const onChangeUsername = (value: string) => {
        setUsername(value);
        setAuthErrorText('');
    };

    const onChangePassword = (value: string) => {
        setPassword(value);
        setAuthErrorText('');
    };

    const onPressForgotPassword = () => {
        setUsername('');
        setPassword('');
        setAuthErrorText('');
        navigation.navigate('RestorePasswordView');
    };

    const onSubmit = async () => {
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
            setAuthErrorText('authorization.invalidCredentials');
            toastService.showError(t('authorization.failed'), response.message || t('authorization.checkYourCredentials'));
            return;
        }

        setPassword('');
        setAuthErrorText('');
        toastService.showSuccess(t('authorization.success'), `${t('common.hello')}, ${response.data.data.name}`);
        navigation.reset({ index: 0, routes: [{ name: 'TabNavigator', params: { screen: 'HomeView' } }] });
    };

    return {
        username,
        password,
        authErrorText,
        isLoading,
        isSubmitDisabled,
        showPasswordToggle,
        onChangeUsername,
        onChangePassword,
        onPressForgotPassword,
        onSubmit,
    };
};
