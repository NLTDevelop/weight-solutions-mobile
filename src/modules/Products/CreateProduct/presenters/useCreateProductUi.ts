interface IProps {
    name: string;
    description: string;
    status: 'active' | 'inactive' | null;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateProductUi = ({ name, description, status, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'products.validation.nameRequired' : '';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'products.validation.descriptionRequired' : '';
    const statusErrorText = isSubmitted && !status ? 'products.validation.statusRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedDescription || !status;

    return {
        nameErrorText,
        descriptionErrorText,
        statusErrorText,
        isSubmitDisabled,
    };
};
