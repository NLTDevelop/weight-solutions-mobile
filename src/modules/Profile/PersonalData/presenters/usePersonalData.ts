import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePersonalDataUi } from './usePersonalDataUi';

export const usePersonalData = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { rows } = usePersonalDataUi();

    const onPressBack = () => {
        navigation.goBack();
    };

    const onPressEdit = () => {
        navigation.navigate('EditPersonalDataView');
    };

    return {
        rows,
        onPressBack,
        onPressEdit,
    };
};
