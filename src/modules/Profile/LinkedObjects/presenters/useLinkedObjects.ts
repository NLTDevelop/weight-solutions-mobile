import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLinkedObjectsUi } from './useLinkedObjectsUi';

export const useLinkedObjects = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onPressBack = () => {
        navigation.goBack();
    };

    const onOpenCompany = (companyId: number) => {
        navigation.navigate('CompanyView', { companyId });
    };

    const { linkedCompany } = useLinkedObjectsUi({
        onOpenCompany,
    });

    return {
        linkedCompany,
        onPressBack,
    };
};
