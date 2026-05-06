import { TouchableOpacity, View } from 'react-native';
import { useConnectionBanner } from '../presenters/useConnectionBanner';
import { Typography } from '../../Typography';
import { useUiContext } from '../../../UIProvider';
import { getStyles } from './styles';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ConnectionContainer = () => {
    const { colors } = useUiContext();
    const { top } = useSafeAreaInsets();
    const styles = useMemo(() => getStyles(colors, top), [colors, top]);
    const { banner, hideBanner } = useConnectionBanner();
    const { visible, backgroundColor, text, textColor, icon } = banner;

    if (!visible) return null;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={hideBanner} style={styles.container}>
            <View style={[styles.content, { backgroundColor }]}>
                {icon}
                <Typography style={[styles.text, { color: textColor }]} variant="body_m" text={text} />
            </View>
        </TouchableOpacity>
    );
};
