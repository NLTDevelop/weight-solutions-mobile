interface IProps {
    name: string;
    contact: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateCompanyUi = ({ name, contact, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'Company name is required' : '';
    const contactErrorText = isSubmitted && !trimmedContact ? 'Contact is required' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedContact;

    return {
        nameErrorText,
        contactErrorText,
        isSubmitDisabled,
    };
};
