import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        content: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(32),
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
            color: colors.text_strong,
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(24),
            fontFamily: 'Roboto-Bold',
            fontWeight: '600',
        },
        subtitle: {
            color: colors.text_middle,
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
            color: colors.text,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14.4),
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
        },
        button: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.primary,
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
            color: colors.text,
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
