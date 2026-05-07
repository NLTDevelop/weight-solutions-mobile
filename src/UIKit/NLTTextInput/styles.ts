import { StyleSheet } from "react-native";
import { scaleFontSize, scaleHorizontal, scaleVertical } from "@/utils";
import { IColors } from "@/UIProvider/theme/IColors";

export const getStyles = (colors: IColors, isFocused: boolean, isError: boolean, shape: 'pill' | 'rounded', hasBottomOffset: boolean) => {
    const styles = StyleSheet.create({
        container: {
            marginBottom: hasBottomOffset ? scaleVertical(16) : 0,
        },
        labelContainer: {
            flexDirection: 'row',
            marginBottom: scaleVertical(4),
        },
        label: {
            color: isError ? colors.text_error : colors.text_middle,
        },
        mandatoryMark: {
            color: isError ? colors.text_error : colors.primary,
        },
        inputContainer: {
            minHeight: scaleVertical(44),
            paddingVertical: 0,
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(12),
            borderWidth: scaleHorizontal(1),
            borderColor: isError ? colors.error : isFocused ? colors.icon_strong : colors.border,
            backgroundColor: isError ? colors.card_secondary : colors.card,
            borderRadius:  scaleHorizontal(22),
            flexDirection: 'row',
        },
        input: {
            flex: 1,
            minHeight: scaleVertical(44),
            fontFamily: 'Roboto-Regular',
            fontSize: scaleFontSize(14),
            includeFontPadding: false,
            paddingVertical: 0,
            color: colors.text_strong,
        },
        inputMultiline: {
            textAlignVertical: 'top',
            paddingVertical: scaleVertical(8),
            minHeight: scaleVertical(80),
        },
        iconContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: scaleVertical(24),
            width: scaleHorizontal(24),
            marginLeft: scaleHorizontal(8),
        },
        inputError: {
            borderColor: colors.error,
            backgroundColor: colors.card_secondary,
        },
        errorText: {
            color: colors.text_error,
            marginTop: scaleVertical(4),
            fontSize: scaleFontSize(10),
        },
    });

    return styles;
};
