import { companyService } from '@/entities/Company/CompanyService';
import { useUiContext } from '@/UIProvider';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useCreateCompanyUi } from './useCreateCompanyUi';

const DESCRIPTION_MAX_LENGTH = 250;

export const useCreateCompany = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [owner, setOwner] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { nameErrorText, ownerErrorText, isSubmitDisabled } = useCreateCompanyUi({ name, owner, isSubmitted, isLoading, t, });

    const onChangeName = (value: string) => {
        setName(value);
    };

    const onChangeEmail = (value: string) => {
        setEmail(value);
    };

    const onChangeAddress = (value: string) => {
        setAddress(value);
    };

    const onChangeOwner = (value: string) => {
        setOwner(value);
    };

    const onChangePhone = (value: string) => {
        setPhone(value);
    };

    const onChangeDescription = (value: string) => {
        setDescription(value.slice(0, DESCRIPTION_MAX_LENGTH));
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

        const trimmedDescription = description.trim();

        const response = await companyService.create({
            name: name.trim(),
            contact: owner.trim(),
            phone: phone.trim(),
            address: address.trim(),
            email: email.trim(),
            description: address.trim() || trimmedDescription,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('companies.createFailedTitle'), response.message || 'Please try again');
            return;
        }
        companyService.list({ limit: 20, offset: 0, status: 'active' });
        toastService.showSuccess(t('companies.createSuccessTitle'), response.data.data.name);
        navigation.replace('CompanyView', { companyId: response.data.data.id });
    };

    return {
        name,
        address,
        owner,
        phone,
        email,
        description,
        isLoading,
        isSubmitDisabled,
        nameErrorText,
        ownerErrorText,
        descriptionLength: description.length,
        descriptionMaxLength: DESCRIPTION_MAX_LENGTH,
        onChangeEmail,
        onChangeName,
        onChangeAddress,
        onChangeOwner,
        onChangePhone,
        onChangeDescription,
        onPressBack,
        onSubmit,
    };
};
