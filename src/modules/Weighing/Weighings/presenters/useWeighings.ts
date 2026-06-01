import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { orderModel } from '@/entities/Order/OrderModel';
import { orderService } from '@/entities/Order/OrderService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { addEventListener } from '@react-native-community/netinfo';

export const useWeighings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        orderService.syncPendingOrders();

        const unsubscribe = addEventListener((state) => {
            if (state.isConnected === true && state.isInternetReachable !== false) {
                orderService.syncPendingOrders();
            }
        });

        return () => {
            orderModel.isGuest = null;
            unsubscribe();
        };
    }, []);

    const onPressCreateWeighing = () => {
        navigation.navigate('CreateWeighingView', { isGuest: false });
    };

    return {
        onPressCreateWeighing,
        contactInformation: contactInformationModel.contactInformation,
    };
};
