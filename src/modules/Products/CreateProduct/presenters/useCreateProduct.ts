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
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, descriptionErrorText, statusErrorText, isSubmitDisabled } = useCreateProductUi({
        name,
        description,
        status,
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

        const response = await productService.create({
            name: name.trim(),
            description: description.trim() || null,
            status,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('products.creationFailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }

        toastService.showSuccess(t('products.created'), response.data.data.name);
        productService.list({ limit: 20, offset: 0, status });
        navigation.goBack();
    };

    return {
        name,
        description,
        status,
        isLoading,
        nameErrorText,
        descriptionErrorText,
        statusErrorText,
        isSubmitDisabled,
        onChangeName,
        onChangeDescription,
        onSelectStatus,
        onSubmit,
    };
};
