interface IProps {
    name: string;
    status: 'active' | 'inactive';
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditProductUi = ({ name, status, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'products.validation.nameRequired' : '';
    const isActiveSelected = status === 'active';
    const isInactiveSelected = status === 'inactive';
    const isSubmitDisabled = isLoading || !trimmedName;

    return {
        nameErrorText,
        isActiveSelected,
        isInactiveSelected,
        isSubmitDisabled,
    };
};
