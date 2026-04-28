import { SplashView } from '@/modules/Splash/ui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = observer(() => {
    return (
        <Stack.Navigator initialRouteName="SplashView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashView" component={SplashView} />
        </Stack.Navigator>
    );
});
