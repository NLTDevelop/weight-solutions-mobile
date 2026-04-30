import React, { FC, memo, useMemo } from 'react';
import { ViewStyle, View, Text } from 'react-native';
import { getStyle } from './styles';
import FastImage from 'react-native-fast-image';
import { useUiContext } from '@/UIProvider';

interface IProps {
    size?: number;
    avatar?: string | null;
    name?: string;
    containerStyle?: ViewStyle;
}

export const Avatar: FC<IProps> = memo(({ containerStyle = {}, avatar, name, size = 40 }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <View style={[styles.container, containerStyle, size ? { width: size, height: size } : undefined]} >
            {avatar
                ? <FastImage
                    source={{ uri: avatar, priority: FastImage.priority.high, }}
                    resizeMode={'cover'}
                    style={[styles.avatar, size ? { width: size, height: size } : undefined]} />
                : <Text style={[styles.logoText, { fontSize: size / 2 }]}>{name?.[0]}{name?.[1]}</Text>
            }
        </View>
    )
})
