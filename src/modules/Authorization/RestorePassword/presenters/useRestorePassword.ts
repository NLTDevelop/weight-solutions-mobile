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

export const useRestorePassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const codeInputRef = useRef<TextInput>(null);

    const [step, setStep] = useState<TRestorePasswordStep>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsLoading(false);
        setStep('code');
        setCode('');
        setIsCodeSubmitted(false);
        toastService.showSuccess('Код надіслано', `Ми надіслали код на ${email.trim()}`);
    };

    const onSubmitCode = async () => {
        setIsCodeSubmitted(true);

        if (ui.isActionDisabled) {
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsLoading(false);
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

        if (ui.isActionDisabled) {
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setIsLoading(false);
        toastService.showSuccess('Пароль оновлено', 'Увійдіть у систему з новим паролем.');
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
            setIsCodeSubmitted(false);
        } else {
            setStep('code');
            setPassword('');
            setConfirmPassword('');
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
        hasPasswordSpecialCharacter: ui.passwordStep.hasPasswordSpecialCharacter,
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
