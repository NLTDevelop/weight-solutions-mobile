import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        screen: {
            flex: 1,
        },
        header: {
            paddingHorizontal: scaleHorizontal(12),
            paddingBottom: scaleVertical(8),
        },
        list: {
            paddingTop: scaleVertical(16),
            flexGrow: 1,
        },
        contentContainerStyle: {
            flexGrow: 1,
            paddingHorizontal: scaleHorizontal(16),
        },
        scrollContent: {
            flexGrow: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(16),
        },
        usersList: {
            gap: scaleVertical(8),
            flexGrow: 1,
        },
        emptyState: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: scaleVertical(148),
            paddingHorizontal: scaleHorizontal(20),
            alignItems: 'center',
        },
        emptyIconCircle: {
            width: scaleHorizontal(64),
            height: scaleHorizontal(64),
            borderRadius: scaleHorizontal(32),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyTitle: {
            marginTop: scaleVertical(16),
            color: colors.text_strong,
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontFamily: 'Roboto-Bold',
            textAlign: 'center',
        },
        emptyDescription: {
            marginTop: scaleVertical(8),
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
            textAlign: 'center',
        },
        footer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(8),
            paddingBottom: scaleVertical(8),
        },
        footerButton: {
            width: '100%',
        },
        footerButtonText: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontFamily: 'Roboto-Medium',
        },
    });
};
