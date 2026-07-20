import { IColors } from '@/UIProvider/theme/IColors';
import { scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        separator: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: scaleVertical(8),
        },
    });
};
