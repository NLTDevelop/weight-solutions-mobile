import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';
import { StyleSheet } from 'react-native';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: scaleHorizontal(12),
            paddingVertical: scaleVertical(6),
            minHeight: scaleVertical(36),
        },
        leftContent: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleHorizontal(8),
            flex: 1,
        },
        iconContainer: {
            width: scaleHorizontal(24),
            height: scaleVertical(24),
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            flex: 1,
            gap: scaleVertical(2),
        },
        title: {
            color: colors.text_strong,
            fontSize: scaleFontSize(15),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
        },
        destructiveTitle: {
            color: colors.text_strong,
        },
        subtitle: {
            color: colors.text_middle,
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontFamily: 'Roboto-Regular',
        },
        toggleTrack: {
            width: scaleHorizontal(46),
            height: scaleVertical(24),
            borderRadius: scaleHorizontal(20),
            paddingHorizontal: scaleHorizontal(3),
            justifyContent: 'center',
        },
        toggleTrackActive: {
            backgroundColor: colors.primary,
            alignItems: 'flex-end',
        },
        toggleTrackInactive: {
            backgroundColor: colors.border,
            alignItems: 'flex-start',
        },
        toggleKnob: {
            width: scaleHorizontal(18),
            height: scaleVertical(18),
            borderRadius: scaleHorizontal(18),
        },
        toggleKnobActive: {
            backgroundColor: colors.background,
        },
        toggleKnobInactive: {
            backgroundColor: colors.background,
        },
    });

    return styles;
};
