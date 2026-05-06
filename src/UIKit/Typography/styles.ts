import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleLineHeight } from '../../utils';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        h1: {
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(26),
            fontWeight: '600',
            fontFamily: 'Inter-ExtraBold',
            color: colors.text_main,
        },
        h2: {
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontWeight: '500',
            fontFamily: 'Inter-ExtraBold',
            color: colors.text_main,
        },
        h3: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '600',
            fontFamily: 'Inter-ExtraBold',
            color: colors.text_main,
        },
        h4: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontWeight: '700',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        h5: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontWeight: '700',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        body_xl: {
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontWeight: '400',
            fontFamily: 'Inter-Regular',
            color: colors.text_main,
        },
        body_l: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '400',
            fontFamily: 'Inter-Regular',
            color: colors.text_main,
        },
        body_l_semibold: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '600',
            fontFamily: 'Inter-ExtraBold',
            color: colors.text_main,
        },
        body_m: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16),
            fontWeight: '400',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        body_m_semibold: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontWeight: '500',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        body_s: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontWeight: '400',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        body_s_semibold: {
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(14),
            fontWeight: '600',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
        body_xs: {
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(14),
            fontWeight: '500',
            fontFamily: 'Inter-Bold',
            color: colors.text_main,
        },
    });
};
