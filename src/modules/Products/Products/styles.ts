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
        searchContainer: {
            paddingHorizontal: scaleHorizontal(4),
            paddingTop: scaleVertical(8),
        },
        searchInputContainer: {
            marginBottom: 0,
        },
        searchInputInner: {
            paddingLeft: scaleHorizontal(12),
        },
        tabsContainer: {
            flexDirection: 'row',
            paddingHorizontal: scaleHorizontal(16),
            backgroundColor: colors.background,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        tab: {
            flex: 1,
            minHeight: scaleVertical(32),
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
            paddingHorizontal: scaleHorizontal(12),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        },
        tabActive: {
            borderBottomColor: colors.primary,
        },
        tabLabel: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Medium',
        },
        list: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainerStyle: {
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(120),
            flexGrow: 1,
        },
        itemSeparator: {
            height: scaleVertical(8),
        },
        footer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
            backgroundColor: colors.card_middle,
        },
        button: {
            width: '100%',
            minHeight: scaleVertical(48),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
    });

    return styles;
};
