import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(24),
        },
        header: {
            paddingHorizontal: scaleHorizontal(20),
            paddingBottom: scaleVertical(16),
        },
        content: {
            flex: 1,
            justifyContent: 'center',
        },
        card: {
            paddingHorizontal: scaleHorizontal(20),
            paddingVertical: scaleVertical(20),
            borderRadius: scaleHorizontal(20),
            backgroundColor: colors.card,
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            gap: scaleVertical(20),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(26),
            lineHeight: scaleLineHeight(32),
            fontFamily: 'Roboto-Bold',
        },
        listContent: {
            gap: scaleVertical(16),
        },
        itemSeparator: {
            height: scaleVertical(16),
        },
        usersHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
        },
        usersTitle: {
            flex: 1,
            color: colors.text_strong,
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(24),
            fontFamily: 'Roboto-Bold',
        },
        addUserButton: {
            minHeight: scaleVertical(40),
            borderRadius: scaleHorizontal(12),
            paddingHorizontal: scaleHorizontal(12),
        },
        addUserButtonText: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Bold',
        },
        usersListContent: {
            minHeight: scaleVertical(80),
        },
        userSeparator: {
            height: scaleVertical(12),
        },
    });

    return styles;
};
