import { useRef, useState } from 'react';
import { type TextInput, type TextInputProps } from 'react-native';

interface IProps extends TextInputProps {
    secureTextEntry?: boolean;
}

export const useNLTTextInput = (props: IProps) => {
    const { secureTextEntry = false, onFocus, onBlur } = props;
    const [isFocused, setFocused] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
    const inputRef = useRef<TextInput>(null);

    const handleFocus: TextInputProps['onFocus'] = e => {
        setFocused(true);
        onFocus?.(e);
    };

    const handleBlur: TextInputProps['onBlur'] = e => {
        setFocused(false);
        onBlur?.(e);
    };

    const onTogglePasswordVisibility = () => {
        setPasswordVisible(previousValue => !previousValue);
    };

    return { isFocused, isPasswordVisible, handleFocus, handleBlur, onTogglePasswordVisibility, inputRef };
};
