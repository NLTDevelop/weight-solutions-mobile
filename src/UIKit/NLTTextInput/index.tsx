import { memo, useMemo } from 'react';
import { TextInput, View, Text, ViewStyle, TextInputProps, TextStyle } from 'react-native';
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
}

export const NLTTextInput = memo(({ label, error, RightAccessory, LeftAccessory, containerStyle, secureTextEntry, inputContainerStyle, isMandatory, labelStyle, ...props }: IProps) => {
    const { colors } = useUiContext();
    const { isFocused, isPasswordVisible, handleFocus, handleBlur, inputRef } = useNLTTextInput({ secureTextEntry, ...props });
    const styles = useMemo(() => getStyles(colors, isFocused), [colors, isFocused]);

    return (
        <View style={[styles.container, containerStyle]}>
            {!!label && (
                <View style={styles.labelContainer}>
                    <Typography variant="body_m_bold" text={label} style={[styles.label, labelStyle]} />
                    {isMandatory && (<Typography variant="body_m_bold" text="*" style={[styles.label, labelStyle]} />)}
                </View>
            )}
            <View style={[styles.inputContainer, inputContainerStyle, error && styles.inputError]}>
                {LeftAccessory}
                <TextInput
                    ref={inputRef}
                    {...props}
                    style={[styles.input, props.multiline && styles.inputMultiline, props.style]}
                    placeholderTextColor={colors.text_additional}
                    secureTextEntry={secureTextEntry && isPasswordVisible}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {RightAccessory}
                {/* {typeof secureTextEntry === 'boolean' && (
                    <TouchableOpacity
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                        style={styles.iconContainer}
                        hitSlop={10}
                    >
                        {isPasswordVisible ? (
                            <Eye color={colors.icon_strong} pointerEvents="none" />
                        ) : (
                            <EyeOff color={colors.icon_strong} pointerEvents="none" />
                        )}
                    </TouchableOpacity>
                )} */}
            </View>
            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
});

NLTTextInput.displayName = 'NLTTextInput';
