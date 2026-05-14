import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        content: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        card: {
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card_middle,
            padding: scaleHorizontal(12),
            gap: scaleVertical(16),
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        titleRow: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            gap: scaleHorizontal(8),
        },
        iconCircle: {
            width: scaleHorizontal(32),
            height: scaleHorizontal(32),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            color: colors.text_strong,
        },
        badge: {
            backgroundColor: '#E7F7F5',
            borderRadius: scaleHorizontal(100),
            paddingHorizontal: scaleHorizontal(8),
            paddingVertical: scaleVertical(4),
        },
        badgeText: {
            color: '#00C8B3',
            fontSize: 12,
            fontFamily: 'Roboto-Bold',
        },
        section: {
            gap: scaleVertical(16),
        },
        rows: {
            gap: scaleVertical(8),
        },
        row: {
            gap: scaleVertical(2),
        },
        rowLabel: {
            color: colors.text_middle,
        },
        rowValue: {
            color: colors.text_strong,
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
        },
        button: {
            minHeight: scaleVertical(48),
            marginTop: scaleVertical(8),
        },
    });
};
