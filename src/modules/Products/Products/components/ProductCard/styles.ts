import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(16),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(8),
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
            
        },
        textWrapper: {
            flex: 1,
        },
        title: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(24),
            fontFamily: 'Roboto-Bold',
        },
        badge: {
            paddingHorizontal: scaleHorizontal(10),
            paddingVertical: scaleVertical(4),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.tertiary_12,
        },
        badgeText: {
            color: colors.primary,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Medium',
        },
        description: {
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Regular',
        },
    });

    return styles;
};
