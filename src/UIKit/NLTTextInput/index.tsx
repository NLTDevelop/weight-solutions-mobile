import { memo, useMemo } from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps, TextStyle, TouchableOpacity } from 'react-native';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { EyeOffIcon } from '@/assets/icons/EyeOffIcon';
import { useUiContext } from '../../UIProvider';
import { Typography } from '../../UIKit/Typography';
import { getStyles } from './styles';
import { useNLTTextInput } from './presenters/useNLTTextInput';

interface IProps extends TextInputProps {
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    inputContainerStyle?: ViewStyle;
    isMandatory?: boolean;
    labelStyle?: TextStyle;
    isError?: boolean;
    shape?: 'pill' | 'rounded';
    showSecureToggle?: boolean;
    hasBottomOffset?: boolean;
}

export const NLTTextInput = memo(({
    label,
    error,
    RightAccessory,
    LeftAccessory,
    containerStyle,
    secureTextEntry,
    inputContainerStyle,
    isMandatory,
    labelStyle,
    isError,
    shape = 'rounded',
    showSecureToggle = false,
    hasBottomOffset = true,
    ...props
}: IProps) => {
    const { colors } = useUiContext();
    const { isFocused, isPasswordVisible, handleFocus, handleBlur, onTogglePasswordVisibility, inputRef } = useNLTTextInput({ secureTextEntry, ...props });
    const hasError = Boolean(isError || error);
    const shouldShowSecureToggle = Boolean(secureTextEntry && showSecureToggle && !RightAccessory);
    const styles = useMemo(() => getStyles(colors, isFocused, hasError, shape, hasBottomOffset), [colors, isFocused, hasError, shape, hasBottomOffset]);

    return (
        <View style={[styles.container, containerStyle]}>
            {!!label && (
                <View style={styles.labelContainer}>
                    <Typography variant="body_m_bold" text={label} style={[styles.label, labelStyle]} />
                    {isMandatory && (<Typography variant="body_m_bold" text="*" style={[styles.mandatoryMark, labelStyle]} />)}
                </View>
            )}
            <View style={[styles.inputContainer, inputContainerStyle, hasError && styles.inputError]}>
                {LeftAccessory}
                <TextInput
                    ref={inputRef}
                    {...props}
                    style={[styles.input, props.multiline && styles.inputMultiline, props.style]}
                    placeholderTextColor={colors.text_light + 'CC'}
                    secureTextEntry={secureTextEntry && isPasswordVisible}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {RightAccessory}
                {shouldShowSecureToggle ? (
                    <TouchableOpacity
                        onPress={onTogglePasswordVisibility}
                        style={styles.iconContainer}
                        hitSlop={10}
                    >
                        {isPasswordVisible ? (
                            <EyeOffIcon color={colors.icon_strong} />
                        ) : (
                            <EyeIcon color={colors.icon_strong} />
                        )}
                    </TouchableOpacity>
                ) : null}
            </View>
            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
});

NLTTextInput.displayName = 'NLTTextInput';
