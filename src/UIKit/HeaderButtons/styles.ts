import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 64,
            marginLeft: 8,
        },
        deleteButton: {
            backgroundColor: colors.warning,
        },
        text: {
            color: colors.text_inverted,
            fontSize: 12,
            lineHeight: 16,
            fontFamily: 'Roboto-Regular',
        }
    });
    return styles;
}
