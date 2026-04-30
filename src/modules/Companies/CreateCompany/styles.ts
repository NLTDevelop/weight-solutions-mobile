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
        card: {
            flex: 1,
            justifyContent: 'center',
        },
        form: {
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(20),
            borderRadius: scaleHorizontal(20),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
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
        multilineInput: {
            minHeight: scaleVertical(112),
            textAlignVertical: 'top',
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
