import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(24),
        },
        header: {
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(16),
        },
        form: {
            gap: scaleVertical(8),
            paddingTop: scaleVertical(16),
            marginBottom: scaleVertical(16),
        },
        button: {
            marginTop: 'auto',
            marginBottom: scaleVertical(8),
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.background_light,
        },
        buttonEnabled: {
            backgroundColor: colors.primary,
        },
    });
};
