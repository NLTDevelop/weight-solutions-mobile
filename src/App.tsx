import { UIProvider } from './UIProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastOverlay } from './libs/toast/ui/ToastOverlay';
import { RootNavigator } from './navigation/rootNavigator';

export const App = () => (
    <UIProvider>
        <SafeAreaProvider>
            <RootNavigator />
            <ToastOverlay />
        </SafeAreaProvider>
    </UIProvider>
);
