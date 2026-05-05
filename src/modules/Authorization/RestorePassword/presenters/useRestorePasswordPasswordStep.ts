import { IPasswordStepPresenter } from '../types/IRestorePassword';

const MIN_PASSWORD_LENGTH = 6;
const DIGIT_REGEXP = /\d/;
const SPECIAL_CHARACTER_REGEXP = /[^A-Za-z0-9]/;

interface IProps {
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    isPasswordTouched: boolean;
    isConfirmPasswordTouched: boolean;
    isPasswordSubmitted: boolean;
}

export const useRestorePasswordPasswordStep = ({
    password,
    confirmPassword,
    isLoading,
    isPasswordTouched,
    isConfirmPasswordTouched,
    isPasswordSubmitted,
}: IProps): IPasswordStepPresenter => {
    const hasPasswordMinLength = password.length >= MIN_PASSWORD_LENGTH;
    const hasPasswordDigit = DIGIT_REGEXP.test(password);
    const hasPasswordSpecialCharacter = SPECIAL_CHARACTER_REGEXP.test(password);
    const isPasswordValid = hasPasswordMinLength && hasPasswordDigit && hasPasswordSpecialCharacter;
    const isPasswordMatch = password.length > 0 && password === confirmPassword;
    const shouldShowPasswordError = (isPasswordTouched || isPasswordSubmitted) && password.length > 0 && !isPasswordValid;
    const shouldShowConfirmPasswordError = (isConfirmPasswordTouched || isPasswordSubmitted) && confirmPassword.length > 0 && !isPasswordMatch;

    return {
        shouldShowConfirmPasswordError,
        shouldHighlightPasswordFields: shouldShowPasswordError || shouldShowConfirmPasswordError,
        isActionDisabled: isLoading || !isPasswordValid || !isPasswordMatch,
        hasPasswordMinLength,
        hasPasswordDigit,
        hasPasswordSpecialCharacter,
    };
};
