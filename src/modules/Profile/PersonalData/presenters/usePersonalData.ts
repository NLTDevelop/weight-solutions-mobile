import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { userModel } from '@/entities/User/UserModel';
import { getProfileRoleTextKey } from '../../presenters/getProfileRoleTextKey';
import { useUiContext } from '@/UIProvider';

export const usePersonalData = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const rows = [
        { id: 'name', label: t('profile.personalName'), value: userModel.user?.name || '-' },
        { id: 'role', label: t('profile.personalRole'), value: getProfileRoleTextKey(userModel.user?.role) },
        { id: 'email', label: t('profile.personalEmail'), value: userModel.user?.email || '-' },
        { id: 'description', label: t('profile.personalDescription'), value: userModel.user?.description || '-' },
    ];

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditPersonalDataView');
    };

    return { rows, onPressBack, onPressEdit, };
};
