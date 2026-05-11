interface IProps {
    name: string;
    description: string;
    status: 'active' | 'inactive';
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditProductUi = ({ name, description, status, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'products.validation.nameRequired' : '';
    const isActiveSelected = status === 'active';
    const isInactiveSelected = status === 'inactive';
    const descriptionErrorText = isSubmitted && !trimmedDescription ? 'products.validation.descriptionRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedDescription;

    return {
        nameErrorText,
        descriptionErrorText,
        isActiveSelected,
        isInactiveSelected,
        isSubmitDisabled,
    };
};
