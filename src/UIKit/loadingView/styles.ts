import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
 
export const getStyle = (_colors: IColors) => {
    return StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
        },
    });
}
