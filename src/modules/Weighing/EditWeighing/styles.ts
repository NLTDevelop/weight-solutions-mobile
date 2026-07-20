import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        content: {
            gap: scaleVertical(8),
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        readonlyInput: {
            backgroundColor: '#F8FAFC',
        },
        sectionTitle: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontWeight: '700',
            fontFamily: 'Roboto-Bold',
            marginTop: scaleVertical(8),
        },
        footer: {
            marginTop: 'auto',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
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
    });
};
