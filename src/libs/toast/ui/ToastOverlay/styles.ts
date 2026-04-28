import { StyleSheet } from 'react-native';
import { IColors } from '../../../../UIProvider/theme/IColors';

export const getStyles = (_colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            elevation: 10000,
            pointerEvents: 'box-none',
        },
    });
    return styles;
};
