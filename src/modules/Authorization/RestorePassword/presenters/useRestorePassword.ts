import { userService } from '@/entities/User/UserService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import {
    ICodeStepComponentProps,
    IEmailStepComponentProps,
    IPasswordStepComponentProps,
    TRestorePasswordStep,
} from '../types/IRestorePassword';
import { useRestorePasswordUi } from './useRestorePasswordUi';
import { useUiContext } from '@/UIProvider';

export const useRestorePassword = () => {
    const { t} = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const codeInputRef = useRef<TextInput>(null);

    const [step, setStep] = useState<TRestorePasswordStep>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
    const [isCodeInputFocused, setIsCodeInputFocused] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
    const [isPasswordSubmitted, setIsPasswordSubmitted] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const ui = useRestorePasswordUi({
        step,
        email,
        code,
        password,
        confirmPassword,
        isLoading,
        isEmailTouched,
        isEmailSubmitted,
        isPasswordTouched,
        isConfirmPasswordTouched,
        isPasswordSubmitted,
        isCodeSubmitted,
        isCodeInputFocused,
    });

    useEffect(() => {
        if (step === 'code') {
            codeInputRef.current?.focus();
        }
    }, [step]);

    const onChangeEmail = (value: string) => {
        setEmail(value);
    };

    const onBlurEmail = () => {
        setIsEmailTouched(true);
    };

    const onChangeCode = (value: string) => {
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
        setCode(sanitizedValue);
    };

    const onFocusCodeInput = () => {
        setIsCodeInputFocused(true);
    };

    const onBlurCodeInput = () => {
        setIsCodeInputFocused(false);
    };

    const onPressCodeInput = () => {
        codeInputRef.current?.focus();
    };

    const onChangePassword = (value: string) => {
        setPassword(value);
    };

    const onChangeConfirmPassword = (value: string) => {
        setConfirmPassword(value);
    };

    const onBlurPassword = () => {
        setIsPasswordTouched(true);
    };

    const onBlurConfirmPassword = () => {
        setIsConfirmPasswordTouched(true);
    };

    const onTogglePasswordVisibility = () => {
        setIsPasswordVisible(previousValue => !previousValue);
    };

    const onToggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(previousValue => !previousValue);
    };

    const onSubmitEmail = async () => {
        setIsEmailSubmitted(true);
        setIsEmailTouched(true);

        if (ui.isActionDisabled) {
            return;
        }

        setIsLoading(true);
        const response = await userService.restorePassword({
            email: email.trim(),
        });
        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('restorePassword.email.failed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        setStep('code');
        setCode('');
        setResetToken('');
        setIsCodeSubmitted(false);
        toastService.showSuccess(t('restorePassword.code.codeIsSend'), `${t('restorePassword.code.weAreSendCodeOn')} ${email.trim()}`);
    };

    const onSubmitCode = async () => {
        setIsCodeSubmitted(true);

        if (ui.isActionDisabled) {
            return;
        }

        setIsLoading(true);
        const response = await userService.verifyRestoreCode({
            email: email.trim(),
            code,
        });
        setIsLoading(false);

        if (response.isError || !response.data?.reset_token) {
            toastService.showError(t('restorePassword.code.failed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        setResetToken(response.data.reset_token);
        setEmail(response.data.email || email.trim());
        setStep('password');
        setPassword('');
        setConfirmPassword('');
        setIsPasswordSubmitted(false);
        setIsPasswordTouched(false);
        setIsConfirmPasswordTouched(false);
    };

    const onSubmitPassword = async () => {
        setIsPasswordSubmitted(true);
        setIsPasswordTouched(true);
        setIsConfirmPasswordTouched(true);

        if (ui.isActionDisabled || !resetToken) {
            return;
        }

        setIsLoading(true);
        const response = await userService.confirmRestorePassword({
            email: email.trim(),
            reset_token: resetToken,
            password,
        });
        setIsLoading(false);

        if (response.isError) {
            toastService.showError(t('restorePassword.password.failed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('restorePassword.password.passwordUpdated'), t('restorePassword.password.enterInSystemWithNewPassword'));
        navigation.reset({ index: 0, routes: [{ name: 'AuthorizationView' }] });
    };

    const onSubmit = () => {
        if (step === 'email') {
            onSubmitEmail();
        } else if (step === 'code') {
            onSubmitCode();
        } else {
            onSubmitPassword();
        }
    };

    const onPressBack = () => {
        if (step === 'email') {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate('AuthorizationView');
            }
        } else if (step === 'code') {
            setStep('email');
            setCode('');
            setResetToken('');
            setIsCodeSubmitted(false);
        } else {
            setStep('code');
            setPassword('');
            setConfirmPassword('');
            setResetToken('');
            setIsPasswordSubmitted(false);
            setIsPasswordTouched(false);
            setIsConfirmPasswordTouched(false);
        }
    };

    const emailStepProps: IEmailStepComponentProps = {
        email,
        shouldShowEmailError: ui.emailStep.shouldShowEmailError,
        onChangeEmail,
        onBlurEmail,
    };

    const codeStepProps: ICodeStepComponentProps = {
        code,
        codeBoxStates: ui.codeStep.codeBoxStates,
        shouldShowCodeError: ui.codeStep.shouldShowCodeError,
        codeInputRef,
        onChangeCode,
        onFocusCodeInput,
        onBlurCodeInput,
        onPressCodeInput,
    };

    const passwordStepProps: IPasswordStepComponentProps = {
        password,
        confirmPassword,
        isPasswordVisible,
        isConfirmPasswordVisible,
        shouldShowConfirmPasswordError: ui.passwordStep.shouldShowConfirmPasswordError,
        shouldHighlightPasswordFields: ui.passwordStep.shouldHighlightPasswordFields,
        hasPasswordMinLength: ui.passwordStep.hasPasswordMinLength,
        hasPasswordDigit: ui.passwordStep.hasPasswordDigit,
        onChangePassword,
        onChangeConfirmPassword,
        onBlurPassword,
        onBlurConfirmPassword,
        onTogglePasswordVisibility,
        onToggleConfirmPasswordVisibility,
    };

    return {
        onSubmit,
        onPressBack,
        emailStepProps,
        codeStepProps,
        passwordStepProps,
        ...ui,
    };
};
