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
        sectionTitle: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
        productSeparator: {
            height: scaleVertical(12),
        },
        errorText: {
            marginTop: scaleVertical(-8),
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
