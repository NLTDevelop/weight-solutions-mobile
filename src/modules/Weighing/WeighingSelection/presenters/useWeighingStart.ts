import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useWeighingStart = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onSelectOwn = () => {
        navigation.navigate('WeighingsListView');
    }

    const onSelectGuest = () => {
        navigation.navigate('WeighingsListView');
    }

    return { onSelectGuest, onSelectOwn, };
};
