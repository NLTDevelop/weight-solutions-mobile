import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { contactInformationService } from '@/entities/ContactInformation/ContactInformationService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useContactInformationUi } from './useContactInformationUi';
import { userModel } from '@/entities/User/UserModel';

export const useContactInformation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isLoading, setIsLoading] = useState(false);
    const { rows } = useContactInformationUi(contactInformationModel.contactInformation || userModel.user?.contact || null);

    useEffect(() => {
        loadContactInformation();
    }, []);

    const loadContactInformation = async () => {
        try {
            setIsLoading(true);
            const response = await contactInformationService.details();
            setIsLoading(false);
            if (response.isError) {
                toastService.showError('Contact information loading failed', response.message || 'Please try again');
            }
        } catch (error) {
            setIsLoading(false);
            console.warn(error)
        }
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditContactInformationView');
    };

    return { rows, isLoading, onPressBack, onPressEdit, };
};
