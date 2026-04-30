import { observer } from 'mobx-react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useUiContext } from '@/UIProvider'; 
import { HomeView } from '@/modules/Home/ui';
import { ProfileView } from '@/modules/Profile/Profile';

const Tab = createBottomTabNavigator();

export const TabNavigator = observer(() => {
    const { colors, t } = useUiContext(); 

    return (
        <Tab.Navigator
            initialRouteName="HomeView"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.text_strong,
                tabBarInactiveTintColor: colors.text_light,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Roboto-Regular',
                },
            }}
            detachInactiveScreens={false}
        >
            <Tab.Screen name="HomeView" component={HomeView} options={{ tabBarLabel: t('tabs.home') }} />
            <Tab.Screen name="ProfileView" component={ProfileView} options={{ tabBarLabel: t('tabs.profile') }} />

            {/* 
            <Tab.Screen
                name="SettingsView"
                component={SettingsView}
                options={{
                    tabBarActiveTintColor: colors.text_strong,
                    tabBarInactiveTintColor: colors.text_light,
                    tabBarLabel: ({ color }) => (
                        <Typography variant="subtitle_8_500" style={{ color }}>
                            {t('tabNavigator.settingsTabLabel')}
                        </Typography>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            source={require('../../assets/lottie/settingsTab.json')}
                        />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
});
