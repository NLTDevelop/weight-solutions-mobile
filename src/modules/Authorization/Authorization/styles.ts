import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(32),
            paddingBottom: scaleVertical(24),
        },
        formContainer: {
            width: '100%',
            gap: scaleVertical(24),
        },
        logo: {
            width: scaleHorizontal(146),
            height: scaleVertical(45),
        },
        titleContainer: {
            gap: scaleVertical(8),
        },
        title: {
            color: colors.text_main,
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(24),
            fontFamily: 'Roboto-Bold',
            fontWeight: '600',
        },
        subtitle: {
            color: colors.text_main,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Regular',
        },
        inputsContainer: {
            gap: scaleVertical(8),
        },
        forgotPasswordButton: {
            minWidth: 0,
            minHeight: scaleVertical(32),
            alignSelf: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: scaleHorizontal(12),
            borderRadius: scaleHorizontal(999),
        },
        forgotPasswordText: {
            color: colors.text_main,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14.4),
            fontFamily: 'Roboto-Medium',
        },
        input: {
            minHeight: scaleVertical(52),
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(14),
            borderRadius: scaleHorizontal(14),
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            backgroundColor: colors.background,
            color: colors.text_main,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Regular',
        },
        inputError: {
            borderColor: colors.semantic_error,
        },
        helperText: {
            color: colors.text_main,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        errorText: {
            color: colors.semantic_error,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        button: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.accent,
            shadowColor: colors.shadow,
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: scaleVertical(2) },
            shadowRadius: scaleHorizontal(4),
            elevation: scaleVertical(2),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19.2),
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
            color: colors.text_main,
        },
        buttonDisabled: {
            opacity: 1,
        },
        illustration: {
            width: scaleHorizontal(444),
            height: scaleVertical(296),
            marginTop: scaleVertical(32),
        },
    });

    return styles;
};
