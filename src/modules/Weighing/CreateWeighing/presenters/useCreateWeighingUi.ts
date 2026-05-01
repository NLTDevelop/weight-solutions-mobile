import { IProduct } from '@/entities/Product/IProduct';
import { ISelectableOptionItem } from '@/modules/Weighing/types/ISelectableOptionItem';

interface IProps {
    products: IProduct[];
    selectedProductId: number | null;
    carNumber: string;
    weightBefore: string;
    weightAfter: string;
    scalePoint: string;
    isSubmitted: boolean;
    isLoading: boolean;
    onSelectProduct: (productId: number) => void;
}

export const useCreateWeighingUi = ({ products, selectedProductId, carNumber, weightBefore, weightAfter, scalePoint, isSubmitted, isLoading, onSelectProduct }: IProps) => {
    const trimmedCarNumber = carNumber.trim();
    const trimmedWeightBefore = weightBefore.trim();
    const trimmedWeightAfter = weightAfter.trim();
    const trimmedScalePoint = scalePoint.trim();

    const productOptions: ISelectableOptionItem[] = products.map(product => ({
        id: product.id,
        title: product.name,
        description: product.description || 'weighings.fallbacks.descriptionUnavailable',
        isSelected: selectedProductId === product.id,
        onPress: () => onSelectProduct(product.id),
    }));

    const productErrorText = isSubmitted && !selectedProductId ? 'weighings.validation.productRequired' : '';
    const carNumberErrorText = isSubmitted && !trimmedCarNumber ? 'weighings.validation.carNumberRequired' : '';
    const weightBeforeErrorText = isSubmitted && !trimmedWeightBefore ? 'weighings.validation.grossWeightRequired' : '';
    const weightAfterErrorText = isSubmitted && !trimmedWeightAfter ? 'weighings.validation.tareWeightRequired' : '';
    const scalePointErrorText = isSubmitted && !trimmedScalePoint ? 'weighings.validation.scalePointRequired' : '';
    const isSubmitDisabled = isLoading || !selectedProductId || !trimmedCarNumber || !trimmedWeightBefore || !trimmedWeightAfter || !trimmedScalePoint;

    return {
        productOptions,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        scalePointErrorText,
        isSubmitDisabled,
    };
};
