import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(20),
            backgroundColor: '#00000066',
        },
        card: {
            width: '100%',
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(16),
            borderRadius: scaleHorizontal(20),
            backgroundColor: colors.background,
            gap: scaleVertical(14),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        title: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
        },
        destructiveTitle: {
            color: colors.text_strong,
        },
        close: {
            color: colors.text_light,
            fontSize: scaleFontSize(22),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Regular',
        },
        description: {
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
        },
        confirmButton: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(12),
        },
        destructiveButton: {
            backgroundColor: colors.error,
        },
        destructiveConfirmButton: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(12),
            backgroundColor: colors.error,
        },
        confirmText: {
            color: colors.text_inverted,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
        cancelButton: {
            minHeight: scaleVertical(44),
            borderRadius: scaleHorizontal(12),
            backgroundColor: colors.background,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
        },
        cancelText: {
            color: colors.text_strong,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
    });

    return styles;
};
