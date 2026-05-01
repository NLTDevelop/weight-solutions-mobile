import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(24),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        form: {
            gap: scaleVertical(16),
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(20),
            borderRadius: scaleHorizontal(20),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
        },
        statusSection: {
            gap: scaleVertical(10),
        },
        statusLabel: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Medium',
        },
        statusRow: {
            flexDirection: 'row',
            gap: scaleHorizontal(10),
        },
        statusOption: {
            flex: 1,
            minHeight: scaleVertical(42),
            borderRadius: scaleHorizontal(12),
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(12),
        },
        statusOptionActive: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        statusOptionText: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Medium',
        },
        statusOptionTextActive: {
            color: colors.text_inverted,
        },
        button: {
            minHeight: scaleVertical(52),
            borderRadius: scaleHorizontal(14),
            marginTop: scaleVertical(8),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
    });

    return styles;
};
