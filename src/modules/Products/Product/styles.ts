import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
        },
        header: {
            paddingHorizontal: scaleHorizontal(12),
            paddingBottom: scaleVertical(8),
        },
        content: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        card: {
            padding: scaleHorizontal(12),
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card_middle,
            borderColor: colors.border,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 4,
        },
        separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
            marginVertical: scaleVertical(8),
        },
        statusBlock: {
            gap: scaleVertical(2),
        },
        statusLabel: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Regular',
        },
        statusBadge: {
            alignSelf: 'flex-start',
            paddingHorizontal: scaleHorizontal(8),
            minHeight: scaleVertical(20),
            borderRadius: scaleHorizontal(100),
            justifyContent: 'center',
        },
        statusBadgeActive: {
            backgroundColor: '#E7F4E8',
        },
        statusBadgeInactive: {
            backgroundColor: colors.border,
        },
        statusBadgeText: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontFamily: 'Roboto-Bold',
        },
        statusBadgeTextActive: {
            color: colors.success,
        },
        statusBadgeTextInactive: {
            color: colors.text_middle,
        },
        footer: {
            marginTop: 'auto',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
            backgroundColor: colors.card_middle,
        },
        button: {
            width: '100%',
        },
        buttonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
    });

    return styles;
};
