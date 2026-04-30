interface IProps {
    name: string;
    username: string;
    email: string;
    description: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditUserUi = ({ name, username, email, description, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedDescription = description.trim();

    const nameErrorText = isSubmitted && !trimmedName ? 'users.validation.nameRequired' : '';
    const usernameErrorText = isSubmitted && !trimmedUsername ? 'users.validation.usernameRequired' : '';
    const emailErrorText = isSubmitted && !trimmedEmail ? 'users.validation.emailRequired' : '';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'users.validation.descriptionRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedUsername || !trimmedEmail || !trimmedDescription;

    return {
        nameErrorText,
        usernameErrorText,
        emailErrorText,
        descriptionErrorText,
        isSubmitDisabled,
    };
};
