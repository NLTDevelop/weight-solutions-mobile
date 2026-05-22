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
            color: isError ? colors.semantic_error : colors.text_main,
        },
        mandatoryMark: {
            color: isError ? colors.semantic_error : colors.primary,
        },
        inputContainer: {
            minHeight: scaleVertical(44),
            paddingVertical: 0,
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(12),
            borderWidth: scaleHorizontal(1),
            borderColor: isError ? colors.semantic_error : isFocused ? colors.border : colors.border,
            backgroundColor: isError ? colors.semantic_error_background : colors.white,
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
            color: colors.text_main,
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
            backgroundColor: colors.semantic_error_background,
            borderColor: colors.semantic_error,
        },
        
        errorText: {
            color: colors.semantic_error,
            marginTop: scaleVertical(4),
            fontSize: scaleFontSize(10),
        },
    });

    return styles;
};
