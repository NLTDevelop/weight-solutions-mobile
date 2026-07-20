import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { userModel } from '@/entities/User/UserModel';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export const useSplash = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            if (userModel.user) {
                navigation.reset({ index: 0, routes: [{ name: 'TabNavigator', params: { screen: 'HomeView' } }] });
            } else {
                navigation.reset({ index: 0, routes: [{ name: 'AuthorizationView' }] });
            }
        }, 1300);
    }, [navigation]);
};
