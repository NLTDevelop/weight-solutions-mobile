interface IProps {
    selectedProductId: number | null;
    carPhone: string;
    carNumber: string;
    movementType: string | null;
    weightCount: number | null;
    firstWeight: string;
    isSubmitted: boolean;
    isLoading: boolean;
}

const NUMBERS_ONLY_REGEX = /^\d+$/;

export const useCreateWeighingUi = ({ selectedProductId, carPhone, carNumber, movementType, weightCount, firstWeight, isSubmitted, isLoading }: IProps) => {
    const trimmedCarPhone = carPhone.trim();
    const trimmedCarNumber = carNumber.trim();
    const trimmedFirstWeight = firstWeight.trim();
    const isFirstWeightNumeric = NUMBERS_ONLY_REGEX.test(trimmedFirstWeight);

    const productErrorText = isSubmitted && !selectedProductId ? 'weighings.validation.productRequired' : '';
    const phoneErrorText = isSubmitted && !trimmedCarPhone ? 'weighings.validation.phoneRequired' : '';
    const carNumberErrorText = isSubmitted && !trimmedCarNumber ? 'weighings.validation.carNumberRequired' : '';
    const movementTypeErrorText = isSubmitted && !movementType ? 'weighings.validation.movementTypeRequired' : '';
    const weightCountErrorText = isSubmitted && !weightCount ? 'weighings.validation.weightCountRequired' : '';
    const firstWeightErrorText = isSubmitted && !trimmedFirstWeight
        ? 'weighings.validation.tareWeightRequired'
        : trimmedFirstWeight && !isFirstWeightNumeric
            ? 'weighings.validation.tareWeightNumbersOnly'
            : '';
    const isSubmitDisabled = isLoading || !selectedProductId || !trimmedCarPhone || !trimmedCarNumber || !movementType || !weightCount || !trimmedFirstWeight || !isFirstWeightNumeric;

    return {
        productErrorText,
        phoneErrorText,
        carNumberErrorText,
        movementTypeErrorText,
        weightCountErrorText,
        firstWeightErrorText,
        isSubmitDisabled,
    };
};
