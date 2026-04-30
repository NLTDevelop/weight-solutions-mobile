import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: colors.border,
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 50,
        },
        logoText: {
            fontSize: 16,
            fontFamily: 'Roboto-Medium',
            color: colors.text,
        },
    });
    return styles;
}
