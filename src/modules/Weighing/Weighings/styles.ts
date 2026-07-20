import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: colors.background,
        },
        phoneContainerStyle: {
            marginTop: scaleVertical(16),
            gap: scaleHorizontal(8),
            marginHorizontal: scaleHorizontal(16)
        },
        searchContainer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(12),
        },
        inputContainerStyle: {
            flex: 1,
        },
        searchInputInner: {
            alignItems: 'center',
            backgroundColor: colors.card,
        },
        filterButton: {
            width: scaleHorizontal(48),
            height: scaleHorizontal(48),
            borderRadius: scaleHorizontal(24),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            position: 'relative',
        },
        filterIndicator: {
            position: 'absolute',
            top: scaleVertical(10),
            right: scaleHorizontal(10),
            width: scaleHorizontal(8),
            height: scaleHorizontal(8),
            borderRadius: scaleHorizontal(4),
            backgroundColor: colors.error,
        },
        tabBar: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: colors.background,
            marginTop: scaleVertical(8),
            marginHorizontal: scaleHorizontal(16),
        },
        tabIndicator: {
            backgroundColor: colors.primary,
            height: 1,
        },
        tabLabel: {
            color: colors.text_strong,
        },
        sceneContainer: {
            backgroundColor: colors.background,
        },
        list: {
            backgroundColor: colors.background,
        },
        contentContainerStyle: {
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(140),
            flexGrow: 1,
        },
        itemSeparator: {
            height: scaleVertical(8),
        },
        footer: {
            position: 'absolute',
            left: scaleHorizontal(16),
            right: scaleHorizontal(16),
            bottom: scaleVertical(16),
        },
    });

    return styles;
};
