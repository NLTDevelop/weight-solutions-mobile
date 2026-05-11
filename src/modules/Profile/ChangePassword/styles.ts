import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    return StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
            paddingHorizontal: scaleHorizontal(16),
            paddingBottom: scaleVertical(24),
        },
        form: {
            marginTop: scaleVertical(16),
            gap: scaleVertical(12),
        },
        titleBlock: {
            marginBottom: scaleVertical(4),
        },
        description: {
            color: colors.text_middle,
        },
        helperCard: {
            marginTop: scaleVertical(4),
            paddingHorizontal: scaleHorizontal(12),
            paddingVertical: scaleVertical(12),
            borderRadius: scaleHorizontal(16),
            backgroundColor: colors.card_middle,
            gap: scaleVertical(8),
        },
        helperTitle: {
            color: colors.text,
        },
        helperRuleText: {
            color: colors.text_middle,
        },
        helperRuleTextActive: {
            color: colors.text_strong,
        },
        button: {
            marginTop: 'auto',
            borderRadius: scaleHorizontal(999),
            marginBottom: scaleVertical(8),
            backgroundColor: colors.background_light,
        },
        buttonEnabled: {
            backgroundColor: colors.primary,
        },
    });
};
