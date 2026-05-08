interface IProps {
    name: string;
    phone: string;
    role: 'superadmin' | 'admin' | 'user';
    email: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditUserUi = ({ name, phone, role, email, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const phoneErrorText = isSubmitted && !trimmedPhone ? 'users.validation.phoneRequired' : '';
    const roleErrorText = isSubmitted && !role ? 'users.validation.roleRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedPhone || !role || !trimmedEmail;

    return {
        nameErrorText,
        phoneErrorText,
        roleErrorText,
        emailErrorText,
        isSubmitDisabled,
    };
};
