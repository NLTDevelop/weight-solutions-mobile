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
            gap: scaleVertical(20),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        summaryCard: {
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(18),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(6),
        },
        name: {
            color: colors.text_strong,
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(26),
            fontFamily: 'Roboto-Bold',
        },
        role: {
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
            textTransform: 'capitalize',
        },
        listContent: {
            gap: scaleVertical(10),
        },
        separator: {
            height: scaleVertical(10),
        },
    });

    return styles;
};
