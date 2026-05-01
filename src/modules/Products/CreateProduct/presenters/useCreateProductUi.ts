interface IProps {
    name: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useCreateProductUi = ({ name, isSubmitted, isLoading }: IProps) => {
    const trimmedName = name.trim();
    const nameErrorText = isSubmitted && !trimmedName ? 'products.validation.nameRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedName;

    return {
        nameErrorText,
        isSubmitDisabled,
    };
};
