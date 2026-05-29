import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        textWrapper: {
            gap: scaleVertical(4),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
        },
        description: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Regular',
        },
    });

    return styles;
};
