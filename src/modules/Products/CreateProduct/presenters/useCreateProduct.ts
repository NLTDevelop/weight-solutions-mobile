import { productService } from '@/entities/Product/ProductService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateProductUi } from './useCreateProductUi';
import { useUiContext } from '@/UIProvider';

export const useCreateProduct = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, isSubmitDisabled } = useCreateProductUi({
        name,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value);
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const response = await productService.create({
            name: name.trim(),
            description: description.trim() || null,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('product.creationFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('product.created'), response.data.data.name);
        navigation.replace('ProductView', { productId: response.data.data.id });
    };

    return {
        name,
        description,
        isLoading,
        nameErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onPressBack,
        onSubmit,
    };
};
