import { observer } from 'mobx-react';
import { Image, StatusBar, View } from 'react-native';
import { getStyles } from './styles';
import { useUiContext } from '@/UIProvider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSplash } from '../presenters/useSplash';
import { useMemo } from 'react';
const logo = require('@/assets/images/logo.png');

export const SplashView = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    useSplash();

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut} style={styles.content} >
                <Image source={logo} style={styles.image} resizeMode="contain" />
            </Animated.View>
        </View>
    );
});
