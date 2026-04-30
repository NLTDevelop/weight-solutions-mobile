import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        listContent: {
            flexGrow: 1,
            paddingHorizontal: scaleHorizontal(20),
            paddingTop: scaleVertical(20),
            paddingBottom: scaleVertical(24),
        },
        header: {
            gap: scaleVertical(16),
            marginBottom: scaleVertical(20),
        },
        headerTextContainer: {
            gap: scaleVertical(6),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(28),
            lineHeight: scaleLineHeight(34),
            fontFamily: 'Roboto-Bold',
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Regular',
        },
        createButton: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(14),
        },
        createButtonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
        itemSeparator: {
            height: scaleVertical(12),
        },
    });

    return styles;
};
