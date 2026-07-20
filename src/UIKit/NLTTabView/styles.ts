import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },
        tabBar: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
        },
        label: {
            textAlign: 'center',
            paddingHorizontal: scaleHorizontal(12),
            paddingTop: scaleVertical(8),
            minHeight: scaleVertical(32),
        },
        indicator: {
            backgroundColor: colors.primary,
        },
        sceneContainer: {
            flex: 1,
        },
    })
    return styles;
};
