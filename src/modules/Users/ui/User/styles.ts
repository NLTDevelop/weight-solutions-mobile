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
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            marginBottom: scaleVertical(8),
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
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
        },
        separator: {
            height: scaleVertical(1),
            backgroundColor: colors.border,
            marginVertical: scaleVertical(8),
        },
        footer: {
            marginTop: 'auto',
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        },
        button: {
            minHeight: scaleVertical(48),
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
