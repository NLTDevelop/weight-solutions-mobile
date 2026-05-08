import { userService } from '@/entities/User/UserService';
import { userModel } from '@/entities/User/UserModel';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { useUiContext } from '@/UIProvider';
import { UserUpdateDto } from '@/entities/Users/dto/user-update.dto';

export const useEditPersonalData = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState(userModel.user?.name || '');
    const [username, setUsername] = useState(userModel.user?.username || '');
    const [email, setEmail] = useState(userModel.user?.email || '');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState(userModel.user?.description || '');
    const [isLoading, setIsLoading] = useState(false);

    const isSubmitDisabled = useMemo(() => {
        return (
            !name.trim() ||
            !username.trim() ||
            !email.trim() ||
            (
                name.trim() === (userModel.user?.name || '') &&
                username.trim() === (userModel.user?.username || '') &&
                email.trim() === (userModel.user?.email || '') &&
                description.trim() === (userModel.user?.description || '') &&
                !password.trim()
            ) ||
            isLoading
        );
    }, [description, email, isLoading, name, password, username]);

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        const currentUserId = userModel.user?.id;

        if (!currentUserId || isSubmitDisabled) {
            return;
        }

        const body: Partial<UserUpdateDto> = {
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
            description: description.trim(),
            company_id: userModel.user?.company?.id || null,
            active: userModel.user?.status === 'active',
        };

        setIsLoading(true);
        const response = await userService.update(currentUserId, password.trim() ? {
            ...body
        } : body);
        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('profile.updateFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('profile.updated'), response.data.data.name);
        navigation.goBack();
    };

    return {
        name,
        username,
        email,
        password,
        description,
        isLoading,
        isSubmitDisabled,
        setName,
        setUsername,
        setEmail,
        setPassword,
        setDescription,
        onPressBack,
        onSubmit,
    };
};
