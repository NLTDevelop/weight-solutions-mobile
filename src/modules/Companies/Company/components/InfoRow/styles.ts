import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            gap: scaleVertical(4),
            paddingBottom: scaleVertical(12),
            borderBottomWidth: scaleHorizontal(1),
            borderBottomColor: colors.border,
        },
        label: {
            color: colors.text_light,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        value: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Medium',
        },
    });

    return styles;
};
