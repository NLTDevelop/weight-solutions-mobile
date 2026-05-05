import { TRestorePasswordStep } from '../types/IRestorePassword';
import { useRestorePasswordCodeStep } from './useRestorePasswordCodeStep';
import { useRestorePasswordEmailStep } from './useRestorePasswordEmailStep';
import { useRestorePasswordPasswordStep } from './useRestorePasswordPasswordStep';

interface IProps {
    step: TRestorePasswordStep;
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    isEmailTouched: boolean;
    isEmailSubmitted: boolean;
    isPasswordTouched: boolean;
    isConfirmPasswordTouched: boolean;
    isPasswordSubmitted: boolean;
    isCodeSubmitted: boolean;
    isCodeInputFocused: boolean;
}

export const useRestorePasswordUi = ({
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
}: IProps) => {
    const emailStep = useRestorePasswordEmailStep({
        email,
        isLoading,
        isEmailTouched,
        isEmailSubmitted,
    });

    const codeStep = useRestorePasswordCodeStep({
        code,
        isLoading,
        isCodeSubmitted,
        isCodeInputFocused,
    });

    const passwordStep = useRestorePasswordPasswordStep({
        password,
        confirmPassword,
        isLoading,
        isPasswordTouched,
        isConfirmPasswordTouched,
        isPasswordSubmitted,
    });

    let titleTextKey = 'restorePassword.email.title';
    let subtitleTextKey = 'restorePassword.email.subtitle';
    let buttonTextKey = 'restorePassword.email.button';

    if (step === 'code') {
        titleTextKey = 'restorePassword.code.title';
        subtitleTextKey = 'restorePassword.code.subtitle';
        buttonTextKey = 'restorePassword.code.button';
    } else if (step === 'password') {
        titleTextKey = 'restorePassword.password.title';
        subtitleTextKey = 'restorePassword.password.subtitle';
        buttonTextKey = 'restorePassword.password.button';
    }

    let isActionDisabled = emailStep.isActionDisabled;

    if (step === 'code') {
        isActionDisabled = codeStep.isActionDisabled;
    } else if (step === 'password') {
        isActionDisabled = passwordStep.isActionDisabled;
    }

    return {
        titleTextKey,
        subtitleTextKey,
        buttonTextKey,
        isEmailStep: step === 'email',
        isCodeStep: step === 'code',
        isPasswordStep: step === 'password',
        isActionDisabled,
        emailStep,
        codeStep,
        passwordStep,
    };
};
