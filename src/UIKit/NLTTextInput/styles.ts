import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "@/utils";
import { IColors } from "@/UIProvider/theme/IColors";

export const getStyles = (colors: IColors, isFocused: boolean) => (
    StyleSheet.create({
        container: {
            marginBottom: scaleVertical(16),
        },
        labelContainer: {
            flexDirection: 'row',
            marginBottom: scaleVertical(4),
        },
        label: {
            color: colors.text_middle,
        },
        inputContainer: {
            minHeight: scaleVertical(44),
            paddingVertical: 0,
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(12),
            borderWidth: 1,
            borderColor: isFocused ? colors.icon_strong : colors.card,
            backgroundColor: colors.card,
            borderRadius: 8,
            flexDirection: 'row',
        },
        input: {
            flex: 1,
            minHeight: scaleVertical(44),
            fontFamily: 'Manrope-Medium',
            fontSize: scaleFontSize(14),
            includeFontPadding: false,
            paddingVertical: 0,
            color: colors.text_strong,
        },
        inputMultiline:{
            textAlignVertical: 'top',
            paddingVertical: scaleVertical(8),
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: scaleVertical(36),
            width: scaleHorizontal(36),
        },
        inputError: {
            borderColor: colors.text_error,
        },
        errorText: {
            color: colors.text_error,
            marginTop: 4,
        },
    }));
