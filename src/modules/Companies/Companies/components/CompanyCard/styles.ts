import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom: scaleVertical(16),
            backgroundColor: colors.card,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            marginBottom: scaleVertical(16),
        },
        titleWrapper: {
            flex: 1,
            justifyContent: 'center',
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
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
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        value: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontWeight: '500',
            fontFamily: 'Roboto-Medium',
        },
        separator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
        },
    });

    return styles;
};
