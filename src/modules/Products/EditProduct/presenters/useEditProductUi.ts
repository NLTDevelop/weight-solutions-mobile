interface IProps {
    name: string;
    description: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditProductUi = ({ name, description, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'products.validation.nameRequired' : '';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'products.validation.descriptionRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedDescription;

    return {
        nameErrorText,
        descriptionErrorText,
        isSubmitDisabled,
    };
};
