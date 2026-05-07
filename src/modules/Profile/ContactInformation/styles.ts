import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(12),
            paddingTop: scaleVertical(16),
        },
        header: {
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(16),
        },
        card: {
            backgroundColor: colors.card_middle,
            borderRadius: scaleHorizontal(8),
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(12),
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
        },
        separator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
        },
        listContent: {
            gap: scaleVertical(8),
        },
        button: {
            marginTop: 'auto',
            marginBottom: scaleVertical(8),
            borderRadius: scaleHorizontal(999),
            paddingHorizontal: scaleHorizontal(20),
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Regular',
            color: colors.text,
        },
        buttonIcon: {
            marginRight: scaleHorizontal(6),
        },
    });
};
