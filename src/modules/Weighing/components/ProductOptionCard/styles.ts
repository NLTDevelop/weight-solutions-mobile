import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: scaleHorizontal(16),
            paddingVertical: scaleVertical(16),
            borderRadius: scaleHorizontal(16),
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            backgroundColor: colors.card,
            gap: scaleVertical(8),
        },
        containerSelected: {
            borderColor: colors.primary,
            backgroundColor: colors.primary + '14',
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        title: {
            flex: 1,
        },
        description: {
            color: colors.text_light,
        },
    });

    return styles;
};
