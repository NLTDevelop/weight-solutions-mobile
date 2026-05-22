import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors, isUnread: boolean = false) => {
    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: colors.card,
            paddingVertical: scaleVertical(16),
            paddingRight: scaleHorizontal(16),
            paddingLeft: scaleHorizontal(isUnread ? 6 : 16),
            gap: scaleHorizontal(4),
        },
        cardHeader: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: scaleHorizontal(4),
        },
        cardRow: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        unreadDot: {
            width: scaleHorizontal(8),
            height: scaleHorizontal(8),
            borderRadius: scaleHorizontal(4),
            marginTop: scaleVertical(5),
            backgroundColor: colors.primary,
        },
        itemSeparator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
            marginVertical: scaleVertical(12)
        },
        cardTitle: {
            color: colors.text_strong,
        },
        cardDate: {
            color: colors.text_light,
            textAlign: 'right',
        },
        cardContent: {
            color: colors.text_middle,
        },
    });

    return styles;
};
