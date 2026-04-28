import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { scaleVertical } from '../../../../utils';
import { toastConfig } from '../../ToastConfig';
import { useUiContext } from '@/UIProvider';
import { getStyles } from './styles';
import { useMemo } from 'react';

export const ToastOverlay = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const insets = useSafeAreaInsets();

    return (
        <View pointerEvents="box-none" style={styles.container}>
            <Toast config={toastConfig} position="top" topOffset={insets.top + scaleVertical(16)} />
        </View>
    );
};
