import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleLineHeight, scaleVertical } from '@/utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.accent,
            borderRadius: 100,
            elevation: 4,
            minHeight: scaleVertical(48),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8,
        },
        disabledButton: {
            // opacity: 0.7,
        },
        text: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            color: colors.text_main,
            fontWeight: '500',
            textAlign: 'center',
        },
        disabledButtonText: {

        },
        absoluteSheet: {
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    return styles;
}
