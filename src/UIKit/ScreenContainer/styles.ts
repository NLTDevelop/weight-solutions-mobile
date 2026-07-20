import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyle = (_colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        contentContainerStyle: {
            flexGrow: 1
        },
    });
    return styles;
}
