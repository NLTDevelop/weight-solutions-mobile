import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors, isConnected: boolean) => StyleSheet.create({
    container: {
        width: scaleHorizontal(112),
        minHeight: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: scaleHorizontal(6),
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: isConnected ? colors.success : colors.error,
    },
});

