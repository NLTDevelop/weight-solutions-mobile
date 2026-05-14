import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            padding: scaleHorizontal(12),
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card_middle,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 4,
            gap: scaleVertical(8),
            marginBottom: scaleVertical(16),
        },
        headerRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: scaleHorizontal(8),
        },
        headerContent: {
            flex: 1,
            gap: scaleVertical(4),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Bold',
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Regular',
        },
        editButton: {
            width: scaleHorizontal(40),
            height: scaleHorizontal(40),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: scaleHorizontal(-8),
            marginTop: scaleVertical(-4),
        },
        separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
        },
        infoBlock: {
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
