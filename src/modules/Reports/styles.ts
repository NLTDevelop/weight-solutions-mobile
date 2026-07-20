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
            flex: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
        },
        card: {
            paddingVertical: scaleVertical(4),
        },
        cardTitle: {
            color: colors.text_strong,
            fontSize: scaleHorizontal(18),
            lineHeight: scaleVertical(24),
            fontWeight: '600',
        },
        cardDescription: {
            marginTop: scaleVertical(8),
            color: colors.text_middle,
            fontSize: scaleHorizontal(14),
            lineHeight: scaleVertical(20),
        },
        userBlock: {
            marginTop: scaleVertical(20),
        },
        dropdownContainer: {
            marginTop: scaleVertical(8),
        },
        rangeBlock: {
            marginTop: scaleVertical(20),
            padding: scaleHorizontal(16),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: colors.text_strong,
            shadowOffset: {
                width: 0,
                height: scaleVertical(4),
            },
            shadowOpacity: 0.1,
            shadowRadius: scaleHorizontal(8),
            elevation: 4,
        },
        rangeLabel: {
            color: colors.text_middle,
            fontSize: scaleHorizontal(12),
            lineHeight: scaleVertical(16),
        },
        rangeValue: {
            marginTop: scaleVertical(6),
            color: colors.text_strong,
            fontSize: scaleHorizontal(16),
            lineHeight: scaleVertical(22),
            fontWeight: '500',
        },
        textButtonContainer: {
            alignSelf: 'flex-start',
            marginTop: scaleVertical(12),
            minWidth: 0,
            padding: scaleHorizontal(12),
            height: 'auto',
            backgroundColor: colors.primary,
            borderRadius: scaleHorizontal(20),
        },
        textButton: {
            color: colors.text_strong,
            fontSize: scaleHorizontal(14),
            lineHeight: scaleVertical(20),
        },
        footer: {
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(16),
        },
    });
};
