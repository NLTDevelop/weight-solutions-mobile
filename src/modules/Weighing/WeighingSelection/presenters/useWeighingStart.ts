import { userModel } from '@/entities/User/UserModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useWeighingStart = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const role = userModel.user?.role;

    const onSelectOwn = () => {
        navigation.navigate('WeighingsListView');
    }

    const onSelectGuest = () => {
        navigation.navigate('WeighingsListView');
    }

    const onNotificationsPress = () => {
        navigation.navigate('NotificationsView');
    }

    return { onSelectGuest, onSelectOwn, role, onNotificationsPress };
};
