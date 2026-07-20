import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: scaleHorizontal(10),
            paddingVertical: scaleVertical(4),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.primary,
        },
    });
    return styles;
};