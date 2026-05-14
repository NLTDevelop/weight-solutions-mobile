import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            gap: scaleVertical(8),
        }, 
        row: {
            flexDirection: 'row',
        },
        phone: {
            color: colors.text_strong,
            fontWeight: '500',
            fontSize: scaleHorizontal(14),
            lineHeight: scaleVertical(18),
        },
    });

    return styles;
};
