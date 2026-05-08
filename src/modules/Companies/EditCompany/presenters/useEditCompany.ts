import { companyModel } from '@/entities/Company/CompanyModel';
import { companyService } from '@/entities/Company/CompanyService';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useCreateCompanyUi } from '@/modules/Companies/CreateCompany/presenters/useCreateCompanyUi';

const DESCRIPTION_MAX_LENGTH = 250;

interface IRouteParams {
    companyId: number;
}

export const useEditCompany = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { companyId } = route.params as IRouteParams;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [owner, setOwner] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const hydrateCompany = useCallback(async () => {
        setIsLoading(true);

        const response = await companyService.details(companyId);

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError('Company loading failed', response.message || 'Please try again');
            return;
        }

        setName(response.data.data.name || '');
        setOwner(response.data.data.contact || '');
        setAddress(response.data.data.address || '');
        setPhone(response.data.data.phone || '');
        setEmail(response.data.data.email || '');
        setDescription(response.data.data.description || '');
        setStatus(response.data.data.status || 'active');
    }, [companyId]);

    useEffect(() => {
        if (companyModel.company?.id === companyId) {
            setName(companyModel.company.name || '');
            setOwner(companyModel.company.contact || '');
            setAddress(companyModel.company.address || '');
            setPhone(companyModel.company.phone || '');
            setEmail(companyModel.company.email || '');
            setDescription(companyModel.company.description || '');
            setStatus(companyModel.company.status || 'active');
            return;
        }

        hydrateCompany();
    }, [companyId, hydrateCompany]);

    const { nameErrorText, ownerErrorText, isSubmitDisabled } = useCreateCompanyUi({ name, owner, isSubmitted, isLoading, t });

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        setIsSubmitted(true);

        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);

        const response = await companyService.update(companyId, {
            name: name.trim(),
            contact: owner.trim(),
            address: address.trim() || null,
            phone: phone.trim() || null,
            email: email.trim() || null,
            description: description.trim() || null,
            status,
        });

        setIsLoading(false);

        if (response.isError || !response.data?.data) {
            toastService.showError(t('companies.updateFailedTitle'), response.message || 'Please try again');
            return;
        }
        companyService.details(companyId);
        toastService.showSuccess(t('companies.updateSuccessTitle'), response.data.data.name);
        navigation.goBack();
    };

    return {
        name,
        email,
        address,
        owner,
        phone,
        description,
        isLoading,
        isSubmitDisabled,
        nameErrorText,
        ownerErrorText,
        descriptionLength: description.length,
        descriptionMaxLength: DESCRIPTION_MAX_LENGTH,
        onChangeEmail: setEmail,
        onChangeName: setName,
        onChangeAddress: setAddress,
        onChangeOwner: setOwner,
        onChangePhone: setPhone,
        onChangeDescription: (value: string) => setDescription(value.slice(0, DESCRIPTION_MAX_LENGTH)),
        onPressBack,
        onSubmit,
    };
};
