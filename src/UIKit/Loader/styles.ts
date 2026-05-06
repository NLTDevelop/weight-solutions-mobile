import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (_colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
}
