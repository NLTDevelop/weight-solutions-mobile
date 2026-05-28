interface IProps {
    secondWeight: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

const NUMBERS_ONLY_REGEX = /^\d+$/;

export const useEditWeighingUi = ({ secondWeight, isSubmitted, isLoading }: IProps) => {
    const trimmedSecondWeight = secondWeight.trim();
    const isSecondWeightNumeric = NUMBERS_ONLY_REGEX.test(trimmedSecondWeight);
    const secondWeightErrorText = isSubmitted && !trimmedSecondWeight
        ? 'weighings.validation.grossWeightRequired'
        : trimmedSecondWeight && !isSecondWeightNumeric
            ? 'weighings.validation.grossWeightNumbersOnly'
            : '';
    const isSubmitDisabled = isLoading || !trimmedSecondWeight || !isSecondWeightNumeric;

    return {
        secondWeightErrorText,
        isSubmitDisabled,
    };
};
