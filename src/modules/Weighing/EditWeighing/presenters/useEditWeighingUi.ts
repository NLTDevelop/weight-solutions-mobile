import { IProduct } from '@/entities/Product/IProduct';
import { ISelectableOptionItem } from '@/modules/Weighing/types/ISelectableOptionItem';

interface IProps {
    products: IProduct[];
    selectedProductId: number | null;
    carNumber: string;
    weightBefore: string;
    weightAfter: string;
    isSubmitted: boolean;
    isLoading: boolean;
    onSelectProduct: (productId: number) => void;
}

export const useEditWeighingUi = ({ products, selectedProductId, carNumber, weightBefore, weightAfter, isSubmitted, isLoading, onSelectProduct }: IProps) => {
    const trimmedCarNumber = carNumber.trim();
    const trimmedWeightBefore = weightBefore.trim();
    const trimmedWeightAfter = weightAfter.trim();

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
    const isSubmitDisabled = isLoading || !selectedProductId || !trimmedCarNumber || !trimmedWeightBefore || !trimmedWeightAfter;

    return {
        productOptions,
        productErrorText,
        carNumberErrorText,
        weightBeforeErrorText,
        weightAfterErrorText,
        isSubmitDisabled,
    };
};
