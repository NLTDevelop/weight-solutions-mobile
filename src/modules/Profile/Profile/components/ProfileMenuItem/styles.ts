import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(14),
            borderRadius: scaleHorizontal(14),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
        },
        content: {
            flex: 1,
            gap: scaleVertical(4),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
        destructiveTitle: {
            color: colors.error,
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
    });

    return styles;
};
