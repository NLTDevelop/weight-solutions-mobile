import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
        },
        headerContainer: {
            paddingHorizontal: scaleHorizontal(12),
            paddingBottom: scaleVertical(8),
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
        },
        searchContainer: {
            paddingTop: scaleVertical(8),
            marginHorizontal: scaleHorizontal(16),
        },
        searchInputContainer: {
            marginBottom: 0,
        },
        searchInputInner: {
            paddingLeft: scaleHorizontal(12),
        },
        tabBar: {
            paddingHorizontal: scaleHorizontal(16),
            backgroundColor: colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        tabIndicator: {
            backgroundColor: colors.primary,
        },
        tabLabel: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Medium',
        },
        scene: {
            flex: 1,
        },
        list: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainerStyle: {
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
            flexGrow: 1,
        },
        itemSeparator: {
            height: scaleVertical(8),
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
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        emptyDescription: {
            marginTop: scaleVertical(8),
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
        },
        footer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        }, 
    });

    return styles;
};
