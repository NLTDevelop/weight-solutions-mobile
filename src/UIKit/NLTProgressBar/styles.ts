import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleVertical } from '../../utils';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            height: scaleVertical(24),
        },
        progressBar: {
            height: scaleVertical(4),
            borderRadius: 4,
            flex: 1,
            backgroundColor: colors.primary + '33',
        },
        progressLine: {
            height: scaleVertical(4),
            borderRadius: 4,
            backgroundColor: colors.primary,
        },
        progressText: {
            color: colors.text,
            fontSize: 12,
            lineHeight: 16,
            fontFamily: 'Roboto-Light',
            marginLeft: scaleVertical(8),
        }
    });
}
