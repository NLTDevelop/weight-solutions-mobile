import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            gap: scaleVertical(2),
        },
        label: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Regular',
        },
        value: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Medium',
        },
    });

    return styles;
};
