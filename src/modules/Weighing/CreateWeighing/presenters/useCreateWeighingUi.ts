interface IProps {
    selectedProductId: number | null;
    carNumber: string;
    movementType: string | null;
    weightType: string | null;
    weightCount: number | null;
    firstWeight: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

const NUMBERS_ONLY_REGEX = /^\d+$/;

export const useCreateWeighingUi = ({ selectedProductId, carNumber, movementType, weightType, weightCount, firstWeight, isSubmitted, isLoading }: IProps) => {
    const trimmedCarNumber = carNumber.trim();
    const trimmedFirstWeight = firstWeight.trim();
    const isFirstWeightNumeric = NUMBERS_ONLY_REGEX.test(trimmedFirstWeight);

    const productErrorText = isSubmitted && !selectedProductId ? 'weighings.validation.productRequired' : '';
    const carNumberErrorText = isSubmitted && !trimmedCarNumber ? 'weighings.validation.carNumberRequired' : '';
    const movementTypeErrorText = isSubmitted && !movementType ? 'weighings.validation.movementTypeRequired' : '';
    const weightTypeErrorText = isSubmitted && !weightType ? 'weighings.validation.weightTypeRequired' : '';
    const weightCountErrorText = isSubmitted && !weightCount ? 'weighings.validation.weightCountRequired' : '';
    const firstWeightErrorText = isSubmitted && !trimmedFirstWeight
        ? 'weighings.validation.tareWeightRequired'
        : trimmedFirstWeight && !isFirstWeightNumeric
            ? 'weighings.validation.tareWeightNumbersOnly'
            : '';
    const isSubmitDisabled = isLoading || !selectedProductId || !trimmedCarNumber || !movementType || !weightType || !weightCount || !trimmedFirstWeight || !isFirstWeightNumeric;

    return {
        productErrorText,
        carNumberErrorText,
        movementTypeErrorText,
        weightTypeErrorText,
        weightCountErrorText,
        firstWeightErrorText,
        isSubmitDisabled,
    };
};
