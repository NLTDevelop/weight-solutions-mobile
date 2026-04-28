import { StyleSheet } from 'react-native';
import { IColors } from '../../../../UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            marginVertical: scaleVertical(10),
            marginHorizontal: scaleHorizontal(10),
            borderRadius: scaleHorizontal(8),
            backgroundColor: colors.background,
        },
        button: {
            justifyContent: 'center',
            padding: scaleVertical(5),
        },
        name: {
            fontSize: 16,
            color: colors.text_strong,
        },
        text: {
            flex: 1,
            color: colors.text_strong,
            textAlign: 'justify',
            marginHorizontal: scaleHorizontal(10),
        },
    });
    return styles;
};
