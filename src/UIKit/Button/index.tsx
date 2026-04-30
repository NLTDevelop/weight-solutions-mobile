import React, { FC, useMemo, memo } from 'react';
import { Text, ActivityIndicator, View, ViewStyle, TouchableOpacity, TextStyle } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    text: string;
    onPress: () => void;
    type?: 'main' | 'secondary';
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
    inProgress?: boolean;
}

export const Button: FC<IProps> = memo(({ text, onPress, disabled, RightAccessory, LeftAccessory, containerStyle, textStyle, inProgress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    // const { textStyle, buttonStyle } = useMemo(() => {
    //     if (disabled) {
    //         return { textStyle: styles.disabledButtonText, buttonStyle: styles.disabledButton };
    //     } else if (type === 'secondary') {
    //         return { textStyle: styles.secondaryText, buttonStyle: styles.secondaryButton };
    //     }
    //     return { textStyle: styles.mainText, buttonStyle: styles.mainButton };
    // }, [disabled, type]);

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.container, containerStyle]}
            onPress={onPress}
        >
            {LeftAccessory}
            <Text numberOfLines={1} style={[styles.text, textStyle]}>{text}</Text>
            {RightAccessory}
            {inProgress ? <View style={styles.absoluteSheet}><ActivityIndicator color={colors.primary} size='large' /></View> : null}
        </TouchableOpacity>
    );
})
