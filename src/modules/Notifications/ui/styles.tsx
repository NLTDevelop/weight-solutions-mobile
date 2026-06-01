import { IColors } from '@/UIProvider/theme/IColors';
import {scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
         screen: {
            flex: 1,
        },
        tabBarView: {
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleHorizontal(7.5),
            minHeight: scaleVertical(20),
            width: 'auto',
        },
        tabBar: {
            marginHorizontal: scaleHorizontal(16)
        },
        tabIndicator: {
            backgroundColor: colors.primary,
            height: 1,
        },
         tabLabel: {
            textAlign: 'left',
            paddingVertical: scaleVertical(7.5)
        },
        list: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainerStyle: {
            flexGrow: 1,
            paddingTop: scaleVertical(16),
            backgroundColor: colors.background,
            paddingBottom: scaleVertical(24),
            paddingHorizontal: scaleHorizontal(16),
            gap: scaleVertical(8),
        },
        itemSeparator: {
            height: scaleVertical(1),
            color: colors.border,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: scaleVertical(120),
            paddingHorizontal: scaleHorizontal(20),
            alignItems: 'center',
        },
        emptyIconCircle: {
            width: scaleHorizontal(64),
            height: scaleHorizontal(64),
            borderRadius: scaleHorizontal(32),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyTitle: {
            marginTop: scaleVertical(16),
            color: colors.text_strong,
            textAlign: 'center',
        },
        emptyDescription: {
            marginTop: scaleVertical(8),
            color: colors.text_middle,
            textAlign: 'center',
        },
    });

    return styles;
};
