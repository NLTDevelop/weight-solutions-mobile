import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { userModel } from '@/entities/User/UserModel';
import { getProfileRoleTextKey } from '../../presenters/getProfileRoleTextKey';

export const usePersonalData = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const rows = [
        { id: 'name', label: 'profile.personalName', value: userModel.user?.name || '-' },
        { id: 'role', label: 'profile.personalRole', value: getProfileRoleTextKey(userModel.user?.role) },
        { id: 'email', label: 'profile.personalEmail', value: userModel.user?.email || '-' },
    ];

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditPersonalDataView');
    };

    return { rows, onPressBack, onPressEdit, };
};
