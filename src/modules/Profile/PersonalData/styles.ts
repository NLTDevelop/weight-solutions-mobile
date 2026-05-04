import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(24),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        card: {
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(12),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(12),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Regular',
        },
        listContent: {
            gap: scaleVertical(8),
        },
        separator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
        },
    });

    return styles;
};
