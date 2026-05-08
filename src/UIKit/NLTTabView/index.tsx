import { useUiContext } from '@/UIProvider';
import React, { useMemo, useState } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { getStyle } from './styles';

interface IRoute {
    key: string;
    title: string;
}

interface IProps {
    routes: IRoute[];
    renderScene: (props: { route: IRoute; }) => React.ReactNode;
    activeColor?: string;
    inactiveColor?: string;
    tabBarStyle?: StyleProp<ViewStyle>;
    indicatorStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    sceneContainerStyle?: StyleProp<ViewStyle>;
}

export const NLTTabView = ({ routes, renderScene, activeColor, inactiveColor, tabBarStyle, indicatorStyle, labelStyle, sceneContainerStyle }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);
    const [index, setIndex] = useState(0);

    const activeRoute = routes[index];

    return (
        <View style={styles.container}>
            <View style={[styles.tabBar, tabBarStyle]}>
                {routes.map((route, routeIndex) => {
                    const isActive = routeIndex === index;

                    return (
                        <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => setIndex(routeIndex)} activeOpacity={0.85}>
                            <Text style={[
                                styles.label,
                                { color: isActive ? (activeColor ?? colors.text_strong) : (inactiveColor ?? colors.text_light) },
                                labelStyle,
                            ]}
                            >
                                {route.title}
                            </Text>
                            <View style={[
                                styles.indicator,
                                isActive && styles.indicatorActive,
                                isActive ? indicatorStyle : null,
                            ]}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={[styles.sceneContainer, sceneContainerStyle]}>
                {activeRoute ? renderScene({ route: activeRoute }) : null}
            </View>
        </View>
    );
};
