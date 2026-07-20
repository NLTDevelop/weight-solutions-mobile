import { StyleSheet } from 'react-native';
import { IColors } from '../../../../UIProvider/theme/IColors';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (_colors: IColors) => {
    const styles = StyleSheet.create({
        button: {
            position: 'absolute',
            left: scaleHorizontal(20),
            bottom: scaleVertical(100),
        },
    });
    return styles;
};
