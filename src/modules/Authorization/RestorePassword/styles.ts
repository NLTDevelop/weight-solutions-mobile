import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            paddingHorizontal: scaleHorizontal(16),
            paddingTop: scaleVertical(16),
            paddingBottom: scaleVertical(24),
        },
        headerButton: {
            minHeight: scaleVertical(32),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginBottom: scaleVertical(44),
        },
        headerButtonText: {
            marginLeft: scaleHorizontal(4),
            color: colors.text,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14.4),
            fontFamily: 'Roboto-Bold',
            fontWeight: '600',
        },
        formContainer: {
            gap: scaleVertical(20),
        },
        logo: {
            width: scaleHorizontal(146),
            height: scaleVertical(45),
        },
        section: {
            gap: scaleVertical(16),
        },
        titleBlock: {
            gap: scaleVertical(8),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(24),
            fontFamily: 'Roboto-Bold',
            fontWeight: '600',
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Regular',
        },
        field: {
            gap: scaleVertical(4),
        },
        fieldLabelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        fieldLabel: {
            color: colors.text,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14.4),
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
        },
        fieldLabelError: {
            color: colors.text_error,
        },
        mandatoryMark: {
            color: colors.primary,
        },
        fieldInputContainer: {
            minHeight: scaleVertical(44),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: scaleHorizontal(12),
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            borderRadius: scaleHorizontal(999),
            backgroundColor: colors.card,
        },
        fieldInputContainerError: {
            borderColor: colors.error,
            backgroundColor: colors.card_secondary,
        },
        fieldInput: {
            flex: 1,
            minHeight: scaleVertical(44),
            paddingVertical: 0,
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Regular',
            includeFontPadding: false,
        },
        fieldErrorText: {
            color: colors.text_error,
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(12),
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
        },
        codeField: {
            gap: scaleVertical(4),
        },
        codeBoxesRow: {
            flexDirection: 'row',
            gap: scaleHorizontal(8),
        },
        codeBox: {
            flex: 1,
            minHeight: scaleVertical(44),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: scaleHorizontal(1),
            borderColor: colors.border,
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card,
        },
        codeBoxActive: {
            borderColor: colors.border_strong,
        },
        codeBoxValue: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Regular',
        },
        codeBoxPlaceholder: {
            color: colors.text_light,
        },
        hiddenCodeInput: {
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
        },
        passwordRightAccessory: {
            width: scaleHorizontal(24),
            height: scaleVertical(24),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scaleHorizontal(8),
        },
        helperCard: {
            paddingHorizontal: scaleHorizontal(8),
            paddingVertical: scaleVertical(8),
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.card_middle,
            shadowColor: colors.shadow,
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: scaleVertical(2) },
            shadowRadius: scaleHorizontal(4),
            elevation: scaleVertical(2),
            gap: scaleVertical(10),
        },
        helperTitleRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        helperIcon: {
            width: scaleHorizontal(20),
            height: scaleVertical(20),
            borderRadius: scaleHorizontal(10),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.warning,
            marginRight: scaleHorizontal(8),
        },
        helperIconText: {
            color: colors.text_inverted,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(12),
            fontFamily: 'Roboto-Bold',
        },
        helperTitle: {
            color: colors.text,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Bold',
            fontWeight: '600',
        },
        helperRules: {
            gap: scaleVertical(8),
        },
        helperRuleRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        helperRuleDot: {
            width: scaleHorizontal(4),
            height: scaleVertical(4),
            borderRadius: scaleHorizontal(2),
            backgroundColor: colors.primary,
            marginHorizontal: scaleHorizontal(4),
            marginRight: scaleHorizontal(8),
        },
        helperRuleText: {
            color: colors.text_middle,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16.8),
            fontFamily: 'Roboto-Regular',
        },
        helperRuleTextActive: {
            color: colors.text_strong,
        },
        actionButton: {
            minHeight: scaleVertical(48),
            borderRadius: scaleHorizontal(999),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: scaleHorizontal(20),
            backgroundColor: colors.primary,
            shadowColor: colors.shadow,
            shadowOpacity: 0.08,
            shadowOffset: { width: 0, height: scaleVertical(2) },
            shadowRadius: scaleHorizontal(4),
            elevation: scaleVertical(2),
        },
        actionButtonDisabled: {
            backgroundColor: colors.background_light,
            shadowOpacity: 0,
            elevation: 0,
        },
        actionButtonText: {
            color: colors.text,
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(19.2),
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
        },
        actionButtonTextDisabled: {
            color: colors.text_inverted,
        },
    });

    return styles;
};
