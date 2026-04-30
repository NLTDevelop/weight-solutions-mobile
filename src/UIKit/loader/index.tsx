import React, { FC, memo, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps {
    size?: number | "large" | "small";
}

export const Loader: FC<IProps> = memo(({ size = 'large' }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return <View style={styles.container} >
        <ActivityIndicator size={size} color={colors.primary} />
    </View>
});
