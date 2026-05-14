import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        content: {
            flex: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            gap: scaleVertical(8),
        },
        marginTop: {
            marginTop: scaleVertical(16),
        },
        optionHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        optionTitle: {
            flex: 1,
            color: colors.text_strong,
            fontWeight: '600',
            fontSize: scaleHorizontal(14),
            lineHeight: scaleVertical(18),
        },
        optionDescription: {
            marginTop: scaleVertical(8),
            color: colors.text_middle,
            fontSize: scaleHorizontal(14),
            lineHeight: scaleVertical(20),
        },
    });

    return styles;
};
