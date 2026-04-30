import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        input: {
            height: 40,
            color: colors.text,
            backgroundColor: colors.card,
            fontFamily: 'Roboto-Regular',
            borderRadius: 8,
            fontSize: 16,
            paddingHorizontal: 10,
        },
    });
}
