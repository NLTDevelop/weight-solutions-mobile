import { UIProvider, useUiContext } from './UIProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastOverlay } from './libs/toast/ui/ToastOverlay';
import { RootNavigator } from './navigation/rootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IColors } from './UIProvider/theme/IColors';
import { useMemo } from 'react';

export const App = () => (
    <UIProvider>
        <ThemedApp />
    </UIProvider>
);

const ThemedApp = () => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <RootNavigator />
                <ToastOverlay />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
};

const getStyle = (colors: IColors) => {
    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.background
        }
    }
    return styles;
};