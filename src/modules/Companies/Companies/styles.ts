import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical, size } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        listContent: {
            flexGrow: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(4),
            paddingBottom: scaleVertical(72),
        },
        header: {
            marginTop: scaleVertical(16),
            gap: scaleVertical(12),
            marginBottom: scaleVertical(16),
            marginHorizontal: scaleHorizontal(16),
        },
        searchInputContainer: {
            marginBottom: 0,
        },
        searchInputInner: {
            backgroundColor: colors.card,
            borderColor: colors.border,
        },
        searchIcon: {
            marginRight: scaleHorizontal(8),
        },
        createButton: {
            position: 'absolute',
            bottom: scaleVertical(8),
            alignSelf: 'baseline',
            width: size.width - scaleHorizontal(32),
            marginHorizontal: scaleHorizontal(16),
        },
        createButtonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
            color: colors.icon_strong,
        },
        itemSeparator: {
            height: scaleVertical(16),
        },
    });

    return styles;
};
