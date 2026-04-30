import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (colors: IColors, backDisabled?: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 16,
        },
        button: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: backDisabled ? 'center' : 'flex-start',
        },
        title: {
            fontSize: 16,
            lineHeight: 24,
            fontWeight: '700',
            fontFamily: 'Roboto-Regular',
            color: colors.text,
        },
    });
    return styles;
}