interface IProps {
    name: string;
    phone: string;
    role: 'admin' | 'user';
    email: string;
    password: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateUserUi = ({ name, phone, role, email, password, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const phoneErrorText = isSubmitted && !trimmedPhone ? 'users.validation.phoneRequired' : '';
    const roleErrorText = isSubmitted && !role ? 'users.validation.roleRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const passwordErrorText = isSubmitted && !trimmedPassword ? 'users.validation.passwordRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedPhone || !role || !trimmedEmail || !trimmedPassword;

    return {
        nameErrorText,
        phoneErrorText,
        roleErrorText,
        emailErrorText,
        passwordErrorText,
        isSubmitDisabled,
    };
};
