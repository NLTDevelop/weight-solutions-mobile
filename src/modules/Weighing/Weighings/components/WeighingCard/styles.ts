import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
              flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        weightNumber: {
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: scaleHorizontal(8),
        },
        content: {
            gap: scaleVertical(8),
            marginTop: scaleVertical(16),
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
        },
        label: {
            color: colors.text_middle,
        },
        value: {
            color: colors.text_strong,
            marginTop: scaleVertical(2),
        },
        actionButton: {
            minHeight: scaleVertical(40),
            borderRadius: scaleHorizontal(999),
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            marginTop: scaleVertical(16),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: scaleHorizontal(6),
            paddingHorizontal: scaleHorizontal(16),
        },
        actionText: {
            color: colors.text_strong,
        },
    });

    return styles;
};
