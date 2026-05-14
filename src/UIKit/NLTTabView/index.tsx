import { useUiContext } from '@/UIProvider';
import React, { useMemo } from 'react';
import { StyleProp, Text, TextStyle, ViewStyle, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { getStyle } from './styles';

export interface IRoute {
    key: string;
    title: string;
}

interface IProps {
    navigationState: {
        index: number;
        routes: IRoute[];
    };
    renderScene: (props: { route: IRoute; }) => React.ReactNode;
    onIndexChange: (index: number) => void;
    activeColor?: string;
    inactiveColor?: string;
    tabBarStyle?: StyleProp<ViewStyle>;
    indicatorStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    sceneContainerStyle?: StyleProp<ViewStyle>;
}

export const NLTTabView = ({ navigationState, renderScene, onIndexChange, activeColor, inactiveColor, tabBarStyle, indicatorStyle, labelStyle, sceneContainerStyle }: IProps) => {
    const { colors } = useUiContext();
    const layout = useWindowDimensions();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const NativeTabView = TabView as any;
    const NativeTabBar = TabBar as any;

    return (
        <NativeTabView
            navigationState={navigationState}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            initialLayout={{ width: layout.width }}
            sceneContainerStyle={[styles.sceneContainer, sceneContainerStyle]}
            renderTabBar={(props: any) => (
                <NativeTabBar
                    {...props}
                    style={[styles.tabBar, tabBarStyle]}
                    indicatorStyle={[styles.indicator, indicatorStyle]}
                    activeColor={activeColor ?? colors.text_strong}
                    inactiveColor={inactiveColor ?? colors.text_light}
                    renderLabel={({ route, color }: { route: IRoute; color: string; }) => (
                        <TabBarLabel label={route.title} color={color} labelStyle={labelStyle} />
                    )}
                    pressColor="transparent"
                />
            )}
        />
    );
};

interface ITabBarLabelProps {
    label: string;
    color: string;
    labelStyle?: StyleProp<TextStyle>;
}

const TabBarLabel = React.memo(({ label, color, labelStyle }: ITabBarLabelProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return <TabBarLabelText label={label} color={color} styles={styles} labelStyle={labelStyle} />;
});

interface ITabBarLabelTextProps {
    label: string;
    color: string;
    styles: ReturnType<typeof getStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

const TabBarLabelText = React.memo(({ label, color, styles, labelStyle }: ITabBarLabelTextProps) => {
    return (
        <Text style={[styles.label, { color }, labelStyle]}>
            {label}
        </Text>
    );
});
