import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingHorizontal: scaleHorizontal(16),
        paddingBottom: scaleVertical(24),
    },
    form: {
        gap: scaleVertical(12),
        paddingTop: scaleVertical(16),
        paddingHorizontal: scaleHorizontal(16),
    },
    button: {
        marginTop: 'auto',
        marginBottom: scaleVertical(8),
        borderRadius: scaleHorizontal(999),
    },
});
