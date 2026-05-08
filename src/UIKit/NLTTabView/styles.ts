import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },
        tabView: {
            width: '100%',
        },
        tabBar: {
            flexDirection: 'row',
            backgroundColor: colors.background,
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: scaleVertical(32),
            paddingHorizontal: scaleHorizontal(12),
            paddingTop: scaleVertical(8),
        },
        label: {
            textAlign: 'center',
        },
        indicator: {
            marginTop: scaleVertical(8),
            width: '100%',
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
        },
        indicatorActive: {
            backgroundColor: colors.primary,
        },
        sceneContainer: {
            flex: 1,
        },
    })
    return styles;
};
