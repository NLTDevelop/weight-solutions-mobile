import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        productName: {
            marginTop: scaleVertical(12),
        },
        metaRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
            marginTop: scaleVertical(8),
            marginBottom: scaleVertical(12),
        },
        metaText: {
            color: colors.text_light,
            flex: 1,
        },
    });

    return styles;
};
