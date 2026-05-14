interface IProps {
    name: string;
    email: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditUserUi = ({ name, email, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedEmail;

    return {
        nameErrorText,
        emailErrorText,
        isSubmitDisabled,
    };
};
