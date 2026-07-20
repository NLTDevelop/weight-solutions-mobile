import React, { FC, useMemo, memo } from 'react';
import { Text, ActivityIndicator, View, ViewStyle, TouchableOpacity, TextStyle, StyleProp } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    text: string;
    onPress: () => void;
    type?: 'main' | 'secondary';
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
    inProgress?: boolean;
}

export const NLTButton: FC<IProps> = memo(({ text, onPress, disabled, RightAccessory, LeftAccessory, containerStyle, textStyle, inProgress }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors, disabled), [colors, disabled]);

    return (
        <TouchableOpacity disabled={disabled} style={[styles.container, containerStyle]} onPress={onPress} >
            {LeftAccessory}
            <Text numberOfLines={1} style={[styles.text, textStyle]}>{text}</Text>
            {RightAccessory}
            {inProgress ? <View style={styles.absoluteSheet}><ActivityIndicator color={colors.icon_strong} size='large' /></View> : null}
        </TouchableOpacity>
    );
})
