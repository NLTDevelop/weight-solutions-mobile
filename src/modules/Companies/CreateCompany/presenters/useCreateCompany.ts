import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateCompanyUi } from './useCreateCompanyUi';

export const useCreateCompany = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, contactErrorText, isSubmitDisabled } = useCreateCompanyUi({
        name,
        contact,
        isSubmitted,
        isLoading,
    });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeContact = (value: string) => {
        setContact(value);
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

        const response = await companyService.create({
            name: name.trim(),
            contact: contact.trim(),
            description: description.trim() || null,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('Company creation failed', response.message || 'Please try again');
            return;
        }

        toastService.showSuccess('Company created', response.data.data.name);
        navigation.replace('CompanyView', { companyId: response.data.data.id });
    };

    return {
        name,
        contact,
        description,
        isLoading,
        isSubmitDisabled,
        nameErrorText,
        contactErrorText,
        onChangeName,
        onChangeContact,
        onChangeDescription,
        onPressBack,
        onSubmit,
    };
};
