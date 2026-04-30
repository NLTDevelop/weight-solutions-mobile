import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(24),
            backgroundColor: colors.background,
        },
        card: {
            width: '100%',
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(24),
            shadowRadius: scaleHorizontal(20),
            elevation: scaleVertical(8),
            gap: scaleVertical(24),
        },
        image: {
            width: scaleVertical(145),
            height: scaleVertical(45),
        },
        header: {
            gap: scaleVertical(8),
        },
        badge: {
            alignSelf: 'flex-start',
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(6),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.tertiary_12,
        },
        badgeText: {
            color: colors.primary,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Medium',
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(28),
            lineHeight: scaleLineHeight(34),
            fontFamily: 'Roboto-Bold',
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Regular',
        },
        form: {
            gap: scaleVertical(16),
        },
        field: {
            gap: scaleVertical(8),
        },
        label: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
        input: {
            minHeight: scaleVertical(52),
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(14),
            borderRadius: scaleHorizontal(14),
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            backgroundColor: colors.background_strong,
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Regular',
        },
        inputError: {
            borderColor: colors.error,
        },
        helperText: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        errorText: {
            color: colors.error,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        button: {
            minHeight: scaleVertical(52),
            borderRadius: scaleHorizontal(14),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
    });

    return styles;
};
