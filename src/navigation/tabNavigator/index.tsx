// import { observer } from 'mobx-react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useUiContext } from '../../UIProvider';
// import { HomeView } from '../../modules-one-platform/base/modules/home/ui';
// import { Typography } from '../../UIKit/Typography';
// import { TabBarIcon } from './components/TabBarIcon';
// import { useNotifications } from '../../libs/notificationService/useNotifications';
// import { PersonalProfileView } from '../../modules-one-platform/base/modules/profile/ui/PersonalProfileView';
// import { SettingsView } from '../../modules-one-platform/base/modules/settings/ui/SettingsView';
// import { ChatsView } from '../../modules-one-platform/chat/modules/chats/ui';
// import { useIsUserAuthorized } from '../../hooks/useIsUserAuthorized';
// import { useChatUnreadMessagesCount } from '@/modules-one-platform/chat/hooks/useChatUnreadMessagesCount';

// const Tab = createBottomTabNavigator();

// export const TabNavigator = observer(() => {
//     const { colors, t } = useUiContext();

//     useNotifications();
//     useIsUserAuthorized();

//     const unreadMessagesCount = useChatUnreadMessagesCount();
//     const hasUnreadChats = unreadMessagesCount > 0;

//     return (
//         <Tab.Navigator
//             initialRouteName="HomeView"
//             screenOptions={{ headerShown: false }}
//             detachInactiveScreens={false}
//         >
//             <Tab.Screen
//                 name="HomeView"
//                 component={HomeView}
//                 options={{
//                     tabBarActiveTintColor: colors.text_strong,
//                     tabBarInactiveTintColor: colors.text_light,
//                     tabBarLabel: ({ color }) => (
//                         <Typography variant="subtitle_8_500" style={{ color }}>
//                             {t('tabNavigator.homeTabLabel')}
//                         </Typography>
//                     ),
//                     tabBarIcon: ({ focused }) => (
//                         <TabBarIcon
//                             focused={focused}
//                             source={require('../../assets/lottie/homeTab.json')}
//                         />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="ChatsView"
//                 component={ChatsView}
//                 options={{
//                     tabBarActiveTintColor: colors.text_strong,
//                     tabBarInactiveTintColor: colors.text_light,
//                     tabBarLabel: ({ color }) => (
//                         <Typography variant="subtitle_8_500" style={{ color }}>
//                             {t('tabNavigator.chatTabLabel')}
//                         </Typography>
//                     ),
//                     tabBarIcon: ({ focused }) => (
//                         <TabBarIcon
//                             focused={focused}
//                             source={require('../../assets/lottie/chatTab.json')}
//                             withBadge={hasUnreadChats}
//                         />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="PersonalProfileView"
//                 component={PersonalProfileView}
//                 options={{
//                     tabBarActiveTintColor: colors.text_strong,
//                     tabBarInactiveTintColor: colors.text_light,
//                     tabBarLabel: ({ color }) => (
//                         <Typography variant="subtitle_8_500" style={{ color }}>
//                             {t('tabNavigator.profileTabLabel')}
//                         </Typography>
//                     ),
//                     tabBarIcon: ({ focused }) => (
//                         <TabBarIcon
//                             focused={focused}
//                             source={require('../../assets/lottie/profileTab.json')}
//                         />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name="SettingsView"
//                 component={SettingsView}
//                 options={{
//                     tabBarActiveTintColor: colors.text_strong,
//                     tabBarInactiveTintColor: colors.text_light,
//                     tabBarLabel: ({ color }) => (
//                         <Typography variant="subtitle_8_500" style={{ color }}>
//                             {t('tabNavigator.settingsTabLabel')}
//                         </Typography>
//                     ),
//                     tabBarIcon: ({ focused }) => (
//                         <TabBarIcon
//                             focused={focused}
//                             source={require('../../assets/lottie/settingsTab.json')}
//                         />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// });