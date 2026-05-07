import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom: scaleVertical(16),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            marginBottom: scaleVertical(16),
        },
        iconWrapper: {
            width: scaleHorizontal(32),
            height: scaleVertical(32),
            borderRadius: scaleHorizontal(16),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
        },
        title: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
        },
        content: {
            gap: scaleVertical(8),
        },
        infoSection: {
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
        separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
        },
    });

    return styles;
};
