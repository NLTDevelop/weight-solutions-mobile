import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { contactInformationService } from '@/entities/ContactInformation/ContactInformationService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';

const normalizeValue = (value: string) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
};

export const useEditContactInformation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [phone, setPhone] = useState('');
    const [phone2, setPhone2] = useState('');
    const [telegram, setTelegram] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [viber, setViber] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [youtube, setYoutube] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const contactInformation = contactInformationModel.contactInformation;

        setPhone(contactInformation?.phone || '');
        setPhone2(contactInformation?.phone2 || '');
        setTelegram(contactInformation?.telegram || '');
        setInstagram(contactInformation?.instagram || '');
        setFacebook(contactInformation?.facebook || '');
        setViber(contactInformation?.viber || '');
        setTiktok(contactInformation?.tiktok || '');
        setYoutube(contactInformation?.youtube || '');
    }, []);

    const payload = useMemo(() => ({
        phone: normalizeValue(phone),
        phone2: normalizeValue(phone2),
        telegram: normalizeValue(telegram),
        instagram: normalizeValue(instagram),
        facebook: normalizeValue(facebook),
        viber: normalizeValue(viber),
        tiktok: normalizeValue(tiktok),
        youtube: normalizeValue(youtube),
    }), [facebook, instagram, phone, phone2, telegram, tiktok, viber, youtube]);

    const initialPayload = useMemo(() => ({
        phone: contactInformationModel.contactInformation?.phone || null,
        phone2: contactInformationModel.contactInformation?.phone2 || null,
        telegram: contactInformationModel.contactInformation?.telegram || null,
        instagram: contactInformationModel.contactInformation?.instagram || null,
        facebook: contactInformationModel.contactInformation?.facebook || null,
        viber: contactInformationModel.contactInformation?.viber || null,
        tiktok: contactInformationModel.contactInformation?.tiktok || null,
        youtube: contactInformationModel.contactInformation?.youtube || null,
    }), []);

    const isSubmitDisabled = JSON.stringify(payload) === JSON.stringify(initialPayload) || isLoading;

    const onPressBack = () => {
        navigation.goBack();
    };

    const onSubmit = async () => {
        if (isSubmitDisabled) {
            return;
        }

        setIsLoading(true);
        const response = await contactInformationService.save(payload);
        setIsLoading(false);

        if (response.isError) {
            toastService.showError('Contact information update failed', response.message || 'Please try again');
            return;
        }

        toastService.showSuccess('Contact information updated', '');
        navigation.goBack();
    };

    return {
        phone,
        phone2,
        telegram,
        instagram,
        facebook,
        viber,
        tiktok,
        youtube,
        isLoading,
        isSubmitDisabled,
        setPhone,
        setPhone2,
        setTelegram,
        setInstagram,
        setFacebook,
        setViber,
        setTiktok,
        setYoutube,
        onPressBack,
        onSubmit,
    };
};
