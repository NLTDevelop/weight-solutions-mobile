interface IProps {
    name: string;
    phone: string;
    email: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditUserUi = ({ name, phone, email, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const phoneErrorText = isSubmitted && !trimmedPhone ? 'users.validation.phoneRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedPhone || !trimmedEmail;

    return {
        nameErrorText,
        phoneErrorText,
        emailErrorText,
        isSubmitDisabled,
    };
};
