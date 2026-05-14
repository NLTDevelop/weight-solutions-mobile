interface IProps {
    name: string;
    role: 'admin' | 'user';
    email: string;
    password: string;
    description: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateUserUi = ({ name, role, email, password, description, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedDescription = description.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const roleErrorText = isSubmitted && !role ? 'users.validation.roleRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const passwordErrorText = isSubmitted && !trimmedPassword ? 'users.validation.passwordRequired' : '';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'users.validation.descriptionRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !role || !trimmedEmail || !trimmedPassword || !trimmedDescription;

    return {
        nameErrorText,
        roleErrorText,
        emailErrorText,
        passwordErrorText,
        descriptionErrorText,
        isSubmitDisabled,
    };
};
