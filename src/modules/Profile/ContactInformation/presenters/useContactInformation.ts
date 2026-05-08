import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { contactInformationService } from '@/entities/ContactInformation/ContactInformationService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useContactInformationUi } from './useContactInformationUi';
import { userModel } from '@/entities/User/UserModel';
import { useUiContext } from '@/UIProvider';

export const useContactInformation = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const { rows } = useContactInformationUi(contactInformationModel.contactInformation || userModel.user?.contact || null);

    const loadContactInformation = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await contactInformationService.details();
            setIsLoading(false);
            if (response.isError) {
                toastService.showError(t('profile.contact.loadingFailed'), response.message || t('profile.tryAgainPlease'));
            }
        } catch (error) {
            setIsLoading(false);
            console.warn(error)
        }
    }, [t]);

    useEffect(() => {
        loadContactInformation();
    }, [loadContactInformation]);

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditContactInformationView');
    };

    return { rows, isLoading, onPressBack, onPressEdit, };
};
