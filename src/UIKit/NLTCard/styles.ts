import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(12),
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            shadowColor: '#000000',
            shadowOpacity: 0.08,
            shadowRadius: 4,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            elevation: 2,
        },
    });
    return styles;
};