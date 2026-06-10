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
        inputContainer: {
            marginBottom: 0,
        },
        readonlyInput: {
            backgroundColor: '#F8FAFC',
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
        dropdownContainer:{
            zIndex: 9999,
        },
    });
};
