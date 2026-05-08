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
        tabBar: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        tabIndicator: {
            backgroundColor: colors.primary,
            height: scaleVertical(1.5),
        },
        tabLabel: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Medium',
            textTransform: 'none',
        },
        sceneContainer: {
            backgroundColor: colors.background,
        },
        scene: {
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: scaleVertical(16),
        },
        scrollContent: {
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(16),
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
            gap: scaleVertical(8),
        },
        cardHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            marginBottom: scaleVertical(8),
        },
        cardTitle: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19),
            fontFamily: 'Roboto-Bold',
        },
        separator: {
            height: StyleSheet.hairlineWidth,
            backgroundColor: colors.border,
            marginVertical: scaleVertical(8),
        },
        usersHeading: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
        },
        usersHeadingText: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Bold',
        },
        usersListContent: {
            minHeight: scaleVertical(80),
        },
        usersList: {
            gap: scaleVertical(8),
            marginTop: scaleVertical(16),
        },
        emptyState: {
            paddingTop: scaleVertical(48),
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

    return styles;
};
