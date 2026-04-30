import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleLineHeight } from '../../utils';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        h1: {
            fontSize: scaleFontSize(20),
            lineHeight: scaleLineHeight(26),
            fontWeight: '600',
            fontFamily: 'Roboto-Bold',
            color: colors.text,
        },
        h2: {
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontWeight: '500',
            fontFamily: 'Roboto-Bold',
            color: colors.text,
        },
        h3: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '600',
            fontFamily: 'Roboto-Bold',
            color: colors.text,
        },
        h4: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontWeight: '700',
            fontFamily: 'Roboto-Bold',
            color: colors.text,
        },
        h5: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontWeight: '700',
            fontFamily: 'Roboto-Bold',
            color: colors.text,
        },
        body_xl: {
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontWeight: '400',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_l: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '400',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_l_bold: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            fontWeight: '600',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_m: {
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(16),
            fontWeight: '400',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_m_bold: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(14),
            fontWeight: '600',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_s: {
            fontSize: scaleFontSize(12),
            lineHeight: scaleLineHeight(16),
            fontWeight: '400',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_s_bold: {
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(14),
            fontWeight: '600',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
        body_xs: {
            fontSize: scaleFontSize(10),
            lineHeight: scaleLineHeight(14),
            fontWeight: '500',
            fontFamily: 'Roboto-Bold',
            color: colors.text_middle,
        },
    });
};
