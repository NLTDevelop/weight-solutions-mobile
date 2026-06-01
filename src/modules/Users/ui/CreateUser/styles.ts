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
            gap: scaleVertical(16),
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        section: {
            gap: scaleVertical(16),
        },
        sectionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
        },
        sectionIconCircle: {
            width: scaleHorizontal(32),
            height: scaleHorizontal(32),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        sectionTitle: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
            fontWeight: '700',
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
        textAreaInner: {
            minHeight: scaleVertical(96),
            borderRadius: scaleHorizontal(16),
            alignItems: 'flex-start',
            paddingTop: scaleVertical(12),
            paddingBottom: scaleVertical(12),
        },
        textArea: {
            minHeight: scaleVertical(72),
            textAlignVertical: 'top',
        },
        errorText: {
            marginTop: scaleVertical(4),
            color: colors.error,
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
    });

    return styles;
};
