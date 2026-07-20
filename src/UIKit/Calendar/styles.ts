import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '../../utils';

export const getStyle = (colors: IColors) => {
    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        container: {
            justifyContent: 'space-between',
            backgroundColor: colors.background,
            borderRadius: 8,
            padding: scaleVertical(12),
            height: scaleVertical(490),
        },
        calendar: {
            width: scaleHorizontal(291),
            backgroundColor: colors.background,
        },
        button: {
            marginTop: scaleVertical(20),
            paddingHorizontal: scaleHorizontal(20),
        },
    });
    return styles;
}
