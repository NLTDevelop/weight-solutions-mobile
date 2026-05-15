interface IProps {
    secondWeight:string;
    isSubmitted: boolean;
    isLoading: boolean;
}

export const useEditWeighingUi = ({ secondWeight, isSubmitted, isLoading }: IProps) => {
    const trimmedSecondWeight = secondWeight.trim();
    const secondWeightErrorText = isSubmitted && !trimmedSecondWeight ? 'weighings.validation.grossWeightRequired' : '';
    const isSubmitDisabled = isLoading || !trimmedSecondWeight;

    return {
        secondWeightErrorText,
        isSubmitDisabled,
    };
};
