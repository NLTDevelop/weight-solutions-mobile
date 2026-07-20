import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '@/utils';

export const getStyle = (colors: IColors, disabled?: boolean) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: disabled ? colors.disabled : colors.accent,
            borderRadius: 100,
            elevation: 4,
            minHeight: scaleVertical(48),
            gap: scaleHorizontal(6),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 8,
            flexDirection: 'row',
        }, 
        text: {
            fontSize: scaleFontSize(16),
            lineHeight: scaleLineHeight(20),
            color: disabled ? colors.card : colors.text_main,
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
