interface IProps {
    secondWeight: string;
    weightType: string | null;
    isSubmitted: boolean;
    isLoading: boolean;
}

const WEIGHT_REGEX = /^\d+$/;

export const useEditWeighingUi = ({ secondWeight, weightType, isSubmitted, isLoading }: IProps) => {
    const trimmedSecondWeight = secondWeight.trim();
    const isSecondWeightNumeric = WEIGHT_REGEX.test(trimmedSecondWeight);
    const weightTypeErrorText = isSubmitted && !weightType ? 'weighings.validation.weightTypeRequired' : '';
    const secondWeightErrorText = isSubmitted && !trimmedSecondWeight
        ? 'weighings.validation.grossWeightRequired'
        : trimmedSecondWeight && !isSecondWeightNumeric
            ? 'weighings.validation.grossWeightNumbersOnly'
            : '';
    const isSubmitDisabled = isLoading || !weightType || !trimmedSecondWeight || !isSecondWeightNumeric;

    return {
        weightTypeErrorText,
        secondWeightErrorText,
        isSubmitDisabled,
    };
};
