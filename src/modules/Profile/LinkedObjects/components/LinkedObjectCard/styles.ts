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
            paddingVertical: scaleVertical(6),
            minHeight: scaleVertical(36),
        },
        leftContent: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            flex: 1,
        },
        iconContainer: {
            width: scaleHorizontal(24),
            height: scaleVertical(24),
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            flex: 1,
            gap: scaleVertical(4),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        description: {
            color: colors.text_light,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
    });

    return styles;
};
