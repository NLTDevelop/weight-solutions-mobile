interface IProps {
    name: string;
    username: string;
    email: string;
    password: string;
    description: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateUserUi = ({ name, username, email, password, description, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedDescription = description.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const usernameErrorText = isSubmitted && !trimmedUsername ? 'users.validation.usernameRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const passwordErrorText = isSubmitted && !trimmedPassword ? 'users.validation.passwordRequired' : '';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'users.validation.descriptionRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedUsername || !trimmedEmail || !trimmedPassword || !trimmedDescription;

    return {
        nameErrorText,
        usernameErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
    };
};
