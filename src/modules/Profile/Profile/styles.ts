import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        content: {
            flex: 1,
            marginTop: scaleVertical(16),
            paddingHorizontal: scaleHorizontal(16),
            gap: scaleVertical(16),
        },
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(24),
            gap: scaleVertical(16),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        summaryCard: {
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(12),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(4),
        },
        name: {
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
            marginBottom: scaleVertical(16),
        },
        role: {
            color: colors.text_light,
            marginTop: scaleVertical(6),
        },
        itemSeparator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
            marginVertical: scaleVertical(12)
        },
        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: scaleHorizontal(8),
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        footerCard: {
            paddingVertical: scaleVertical(8),
        },
        logo: {
            width: scaleHorizontal(32),
            height: scaleVertical(32),
        },
        footerText: {
            color: colors.text_middle,
            textAlign: 'left',
        },
    });

    return styles;
};
