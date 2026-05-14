import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { contactInformationService } from '@/entities/ContactInformation/ContactInformationService';
import { useEffect } from 'react';
import { Linking } from 'react-native';

export const usePhoneBanners = () => {
    const contactInformation = contactInformationModel.contactInformation;

    useEffect(() => {
        contactInformationService.details();
    }, [contactInformation]);

    const onPressFirstPhone = () => {
        Linking.openURL(`tel:${contactInformation?.phone}`)
    }

    const onPressSecondPhone = () => {
        Linking.openURL(`tel:${contactInformation?.phone2}`)
    }

    return { contactInformation, onPressFirstPhone, onPressSecondPhone };
}; 
