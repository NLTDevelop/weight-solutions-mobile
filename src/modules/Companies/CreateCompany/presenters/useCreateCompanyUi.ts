interface IProps {
    name: string;
    owner: string;
    isSubmitted: boolean;
    isLoading: boolean;
    t: (scope: string) => string;
}

export const useCreateCompanyUi = ({ name, owner, isSubmitted, isLoading, t }: IProps) => {
    const trimmedName = name.trim();
    const trimmedOwner = owner.trim();
    const nameErrorText = isSubmitted && !trimmedName ? t('companies.validationNameRequired') : '';
    const ownerErrorText = isSubmitted && !trimmedOwner ? t('companies.validationOwnerRequired') : '';
    const isSubmitDisabled = isLoading || !trimmedName || !trimmedOwner;

    return {
        nameErrorText,
        ownerErrorText,
        isSubmitDisabled,
    };
};
