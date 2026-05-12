import { userService } from '@/entities/User/UserService';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

const MIN_PASSWORD_LENGTH = 6;
const DIGIT_REGEXP = /\d/;

export const useChangePassword = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOldPasswordTouched, setIsOldPasswordTouched] = useState(false);
    const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasPasswordMinLength = newPassword.length >= MIN_PASSWORD_LENGTH;
    const hasPasswordDigit = DIGIT_REGEXP.test(newPassword);
    const isPasswordValid = hasPasswordMinLength && hasPasswordDigit;
    const isPasswordMatch = newPassword.length > 0 && newPassword === confirmPassword;
    const isSameAsOld = oldPassword.length > 0 && oldPassword === newPassword;

    const oldPasswordError = useMemo(() => {
        if (!(isOldPasswordTouched || isSubmitted)) {
            return '';
        }

        return oldPassword.trim().length === 0 ? 'profile.changePasswordOldRequired' : '';
    }, [isOldPasswordTouched, isSubmitted, oldPassword]);

    const newPasswordError = useMemo(() => {
        if (!(isNewPasswordTouched || isSubmitted)) {
            return '';
        }

        if (newPassword.length === 0) {
            return 'profile.changePasswordNewRequired';
        }

        if (isSameAsOld) {
            return 'profile.changePasswordSameAsOld';
        }

        return !isPasswordValid ? 'profile.changePasswordNewInvalid' : '';
    }, [isNewPasswordTouched, isSubmitted, newPassword, isSameAsOld, isPasswordValid]);

    const confirmPasswordError = useMemo(() => {
        if (!(isConfirmPasswordTouched || isSubmitted)) {
            return '';
        }

        if (confirmPassword.length === 0) {
            return 'profile.changePasswordConfirmRequired';
        }

        return !isPasswordMatch ? 'profile.changePasswordConfirmMismatch' : '';
    }, [confirmPassword, isConfirmPasswordTouched, isPasswordMatch, isSubmitted]);

    const isSubmitDisabled = isLoading
        || oldPassword.trim().length === 0
        || !isPasswordValid
        || !isPasswordMatch
        || isSameAsOld;

    const onBlurOldPassword = () => {
        setIsOldPasswordTouched(true);
    };

    const onBlurNewPassword = () => {
        setIsNewPasswordTouched(true);
    };

    const onBlurConfirmPassword = () => {
        setIsConfirmPasswordTouched(true);
    };

    const onSubmit = async () => {
        setIsSubmitted(true);
        setIsOldPasswordTouched(true);
        setIsNewPasswordTouched(true);
        setIsConfirmPasswordTouched(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);
        const response = await userService.changePassword({
            current_password: oldPassword,
            password: newPassword,
        });
        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('profile.changePasswordFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('profile.changePasswordSuccess'), '');
        navigation.goBack();
    };

    return {
        oldPassword,
        newPassword,
        confirmPassword,
        isLoading,
        isSubmitDisabled,
        oldPasswordError,
        newPasswordError,
        confirmPasswordError,
        hasPasswordMinLength,
        hasPasswordDigit,
        setOldPassword,
        setNewPassword,
        setConfirmPassword,
        onBlurOldPassword,
        onBlurNewPassword,
        onBlurConfirmPassword,
        onSubmit,
    };
};
