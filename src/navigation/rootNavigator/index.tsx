import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { MainStackNavigator } from '../stackNavigator';
import { useUiContext } from '@/UIProvider';
import { Logger } from '../../UIKit/Logger/ui/Logger';
import { observer } from 'mobx-react';
import { ConnectionContainer } from '@/UIKit/ConnectionBanner/ui';


type RootStackParamList = Record<string, object | undefined>;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const RootNavigator = observer(() => {
    const { colors, theme, fonts } = useUiContext();

    return (
        <NavigationContainer ref={navigationRef} theme={{ colors, dark: theme === 'dark', fonts }}>
            <ConnectionContainer />
            <MainStackNavigator />
            <Logger />
        </NavigationContainer>
    );
});
