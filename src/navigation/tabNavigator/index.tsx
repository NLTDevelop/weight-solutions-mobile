import { useUiContext } from '@/UIProvider';
import { HomeTabIcon } from '@/assets/icons/HomeTabIcon';
import { ProductsTabIcon } from '@/assets/icons/ProductsTabIcon';
import { ProfileIcon } from '@/assets/icons/ProfileIcon';
import { ScaleTabIcon } from '@/assets/icons/ScaleTabIcon';
import { userModel } from '@/entities/User/UserModel';
import { userService } from '@/entities/User/UserService';
import { HomeView } from '@/modules/Home/ui';
import { ProductsView } from '@/modules/Products/Products';
import { ProfileView } from '@/modules/Profile/Profile';
import { WeighingsView } from '@/modules/Weighing/Weighings/ui';
import { scaleVertical } from '@/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react';
import React, { ReactNode, useEffect, useMemo } from 'react';

const Tab = createBottomTabNavigator();

type AppRole = 'superadmin' | 'admin' | 'user';
type TabRouteName = 'HomeView' | 'ProductsView' | 'ProfileView' | 'WeighingsView';

interface ITabConfig {
    routeName: TabRouteName;
    label: string;
    icon: (color: string) => ReactNode;
}

const getTabConfigs = (role: AppRole, t: (key: string) => string): ITabConfig[] => {
    switch (role) {
        case 'superadmin':
            return [
                {
                    routeName: 'HomeView',
                    label: t('tabs.home'),
                    icon: (color) => <HomeTabIcon color={color} />,
                },
                {
                    routeName: 'ProfileView',
                    label: t('tabs.profile'),
                    icon: (color) => <ProfileIcon color={color} />,
                },
            ];
        case 'user':
            return [
                {
                    routeName: 'WeighingsView',
                    label: t('tabs.weighings'),
                    icon: (color) => <ScaleTabIcon color={color} />,
                },
                {
                    routeName: 'ProfileView',
                    label: t('tabs.profile'),
                    icon: (color) => <ProfileIcon color={color} />,
                },
            ];
        case 'admin':
        default:
            return [
                {
                    routeName: 'WeighingsView',
                    label: t('tabs.weighings'),
                    icon: (color) => <ScaleTabIcon color={color} />,
                },
                {
                    routeName: 'ProductsView',
                    label: t('tabs.products'),
                    icon: (color) => <ProductsTabIcon color={color} />,
                },
                {
                    routeName: 'ProfileView',
                    label: t('tabs.profile'),
                    icon: (color) => <ProfileIcon color={color} />,
                },
            ];
    }
};

export const TabNavigator = observer(() => {
    const { t, colors } = useUiContext();
    const role = userModel.user?.role ?? 'admin';
    const tabs = useMemo(() => getTabConfigs(role, t), [role, t]);

    useEffect(() => {
        userService.me();
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.text_strong,
                tabBarInactiveTintColor: colors.text_light,
                tabBarStyle: {
                    height: scaleVertical(90),
                    paddingTop: scaleVertical(8),
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Roboto-Regular',
                },
            }}
            detachInactiveScreens={false}
        >
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.routeName}
                    name={tab.routeName}
                    component={TAB_ROUTES[tab.routeName]}
                    options={{
                        tabBarLabel: tab.label,
                        tabBarIcon: ({ color }) => tab.icon(color),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
});

const TAB_ROUTES: Record<TabRouteName, React.ComponentType<any>> = {
    HomeView,
    ProductsView,
    ProfileView,
    WeighingsView,
};

