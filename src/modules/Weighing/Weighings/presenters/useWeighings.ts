import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { orderModel } from '@/entities/Order/OrderModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';

export const useWeighings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        return () => {
            orderModel.isGuest = null;
        }
    }, []);

    const onPressCreateWeighing = () => {
        navigation.navigate('CreateWeighingView', { isGuest: false });
    };

    return {
        onPressCreateWeighing,
        contactInformation: contactInformationModel.contactInformation,
    };
};
