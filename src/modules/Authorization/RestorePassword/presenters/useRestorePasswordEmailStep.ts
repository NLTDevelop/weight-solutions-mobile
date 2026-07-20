import { IEmailStepPresenter } from '../types/IRestorePassword';

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IProps {
    email: string;
    isLoading: boolean;
    isEmailTouched: boolean;
    isEmailSubmitted: boolean;
}

export const useRestorePasswordEmailStep = ({
    email,
    isLoading,
    isEmailTouched,
    isEmailSubmitted,
}: IProps): IEmailStepPresenter => {
    const trimmedEmail = email.trim();
    const isEmailValid = EMAIL_REGEXP.test(trimmedEmail);
    const shouldShowEmailError = (isEmailTouched || isEmailSubmitted) && trimmedEmail.length > 0 && !isEmailValid;

    return {
        shouldShowEmailError,
        isActionDisabled: isLoading || !isEmailValid,
    };
};
