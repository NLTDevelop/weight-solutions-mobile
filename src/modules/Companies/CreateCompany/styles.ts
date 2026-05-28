import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            marginTop: scaleVertical(16),
        },
        header: {
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(12),
        },
        headerRightSpacer: {
            width: scaleHorizontal(50),
            height: scaleVertical(50),
        },
        content: {
            flex: 1,
            paddingHorizontal: scaleHorizontal(16),
        },
        form: {
            gap: scaleVertical(8),
        },
        field: {
            gap: scaleVertical(4),
        },
        labelStyle: {
            color: colors.icon_strong,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Medium',
        },
        inputContainer: {
            marginBottom: 0,
        },
        pillInputInner: {
            minHeight: scaleVertical(44),
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: scaleHorizontal(999),
        },
        multilineInputInner: {
            minHeight: scaleVertical(64),
            alignItems: 'flex-start',
            paddingTop: scaleVertical(12),
            paddingBottom: scaleVertical(12),
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: scaleHorizontal(8),
        },
        multilineInput: {
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
        footer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        }, 
        buttonDisabled: {
            backgroundColor: '#A1A3A5',
            shadowOpacity: 0,
            elevation: 0,
        },
        buttonTextDisabled: {
            color: colors.card,
        },
    });

    return styles;
};
