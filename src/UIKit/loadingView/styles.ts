import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
 
export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background_dark,
        },
    });
}
