import { StyleSheet } from 'react-native';
import { IColors } from '../../../UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (colors: IColors, insetTop: number) => {
    const topOffset = insetTop || 0;
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: topOffset,
            left: 0,
            right: 0,
            zIndex: 10,
            elevation: 10,
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.error,
            gap: scaleHorizontal(4),
            paddingVertical: scaleVertical(4),
        },
        text: {
            color: colors.text,
        },
    });
    return styles;
};
