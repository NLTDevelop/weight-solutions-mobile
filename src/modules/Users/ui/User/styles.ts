import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(24),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        content: {
            flex: 1,
            justifyContent: 'center',
        },
        card: {
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(20),
            borderRadius: scaleHorizontal(20),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(20),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(24),
            lineHeight: scaleLineHeight(30),
            fontFamily: 'Roboto-Bold',
        },
        listContent: {
            gap: scaleVertical(16),
        },
        itemSeparator: {
            height: scaleVertical(16),
        },
        button: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(14),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Bold',
        },
    });

    return styles;
};
