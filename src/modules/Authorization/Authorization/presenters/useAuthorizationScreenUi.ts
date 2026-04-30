interface IProps {
    username: string;
    password: string;
    isLoading: boolean;
    isUsernameTouched: boolean;
    isPasswordTouched: boolean;
    isSubmitted: boolean;
}

export const useAuthorizationScreenUi = ({
    username,
    password,
    isLoading,
    isUsernameTouched,
    isPasswordTouched,
    isSubmitted,
}: IProps) => {
    const trimmedUsername = username.trim();
    const shouldShowUsernameError = (isUsernameTouched || isSubmitted) && trimmedUsername.length > 0 && trimmedUsername.length < 5;
    const shouldShowPasswordError = (isPasswordTouched || isSubmitted) && password.length > 0 && password.length < 8;

    const usernameErrorText = shouldShowUsernameError ? 'Username must contain at least 5 characters' : '';
    const passwordErrorText = shouldShowPasswordError ? 'Password must contain at least 8 characters' : '';
    const isSubmitDisabled = isLoading || trimmedUsername.length < 5 || password.length < 8;

    return {
        usernameErrorText,
        passwordErrorText,
        isSubmitDisabled,
    };
};
