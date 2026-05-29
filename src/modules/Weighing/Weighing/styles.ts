import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
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
        },
        badgeText: {
            color: '#00C8B3',
            fontSize: 12,
            fontFamily: 'Roboto-Bold',
        },
        section: {
            marginBottom: scaleVertical(8),
        },
        titleSection: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '500',
            fontFamily: 'Inter-ExtraBold',
            color: colors.text_main,
            marginVertical: scaleVertical(16),
        },
        separator: {
            height: 1,
            backgroundColor: colors.border,
            marginVertical: scaleVertical(8),
        },
    });
};
