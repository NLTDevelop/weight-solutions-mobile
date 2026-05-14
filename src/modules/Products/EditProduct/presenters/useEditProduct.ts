import { productModel } from '@/entities/Product/ProductModel';
import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useEditProductUi } from './useEditProductUi';
import { useUiContext } from '@/UIProvider';

interface IRouteParams {
    productId: number;
}

export const useEditProduct = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { productId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const hydrateProduct = useCallback(async () => {
        setIsLoading(true);

        const response = await productService.details(productId);

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('products.loadingFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        setName(response.data.data.name || '');
        setDescription(response.data.data.description || '');
        setStatus(response.data.data.active || 'active');
    }, [productId, t]);

    useEffect(() => {
        if (productModel.current?.id === productId) {
            setName(productModel.current.name || '');
            setDescription(productModel.current.description || '');
            setStatus(productModel.current.active || 'active');
            return;
        }

        hydrateProduct();
    }, [hydrateProduct, productId]);

    const { nameErrorText, descriptionErrorText, isSubmitDisabled } = useEditProductUi({
        name,
        description,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value.slice(0, 250));
    };

    const onSelectStatus = (value: 'active' | 'inactive') => {
        setStatus(value);
    };

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const response = await productService.update(productId, {
            name: name.trim(),
            description: description.trim() || null,
            status,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('products.updateFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('products.updated'), response.data.data.name);
        navigation.goBack();
    };

    return {
        name,
        description,
        status,
        isLoading,
        nameErrorText,
        descriptionErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onSelectStatus,
        onSubmit,
    };
};
