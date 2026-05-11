import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        header: {
            paddingHorizontal: scaleHorizontal(12),
            paddingBottom: scaleVertical(8),
        },
        content: {
            gap: scaleVertical(8),
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        inputContainer: {
            marginBottom: 0,
        },
        labelRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(2),
            marginBottom: scaleVertical(4),
        },
        label: {
            color: colors.text_secondary,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Medium',
        },
        mandatoryMark: {
            color: colors.primary,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Bold',
        },
        selectField: {
            minHeight: scaleVertical(44),
            borderRadius: scaleHorizontal(999),
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            paddingHorizontal: scaleHorizontal(12),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(8),
        },
        selectFieldError: {
            borderColor: colors.error,
        },
        selectValue: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Regular',
        },
        placeholderText: {
            color: colors.text_light,
        },
        textAreaInner: {
            minHeight: scaleVertical(64),
            borderRadius: scaleHorizontal(8),
            alignItems: 'flex-start',
            paddingTop: scaleVertical(12),
            paddingBottom: scaleVertical(12),
        },
        textArea: {
            minHeight: scaleVertical(40),
            textAlignVertical: 'top',
        },
        counterText: {
            color: colors.text_light,
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(12),
            fontFamily: 'Roboto-Medium',
            textAlign: 'right',
        },
        errorText: {
            marginTop: scaleVertical(4),
            color: colors.text_error,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Regular',
        },
        footer: {
            marginTop: 'auto',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        },
        button: {
            minHeight: scaleVertical(48),
            width: '100%',
        },
        buttonDisabled: {
            backgroundColor: colors.background_light,
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
        buttonTextDisabled: {
            color: colors.text_inverted,
        },
    });

    return styles;
};
