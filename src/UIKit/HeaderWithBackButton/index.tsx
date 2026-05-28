import React, { FC, useCallback, useMemo } from 'react';
import { Text, View, TouchableOpacity, Keyboard, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';
import { ArrowIcon } from '@/assets/icons/ArrowIcon';

interface IProps {
    title?: string;
    onPressBack?: () => void;
    backDisabled?: boolean;
    rightComponent?: React.ReactNode;
    containerStyle?: ViewStyle;
    isCenterPlacement?: boolean;
}

export const HeaderWithBackButton: FC<IProps> = ({ title, backDisabled, rightComponent, containerStyle, onPressBack, isCenterPlacement }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors, backDisabled, isCenterPlacement), [colors, backDisabled, isCenterPlacement]);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const onGoBack = useCallback(() => {
        Keyboard.dismiss();
        if (onPressBack) {
            onPressBack();
        } else {
            navigation.canGoBack() && navigation.goBack();
        }
    }, [onPressBack, navigation]);

    return (
        <View style={[styles.container, containerStyle]}>
            {backDisabled ? null
                : <TouchableOpacity style={styles.button} onPress={onGoBack}>
                    <ArrowIcon color={colors.icon_middle} />
                </TouchableOpacity>}
            <View style={[styles.titleContainer]}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            {rightComponent}
        </View>
    );
};
