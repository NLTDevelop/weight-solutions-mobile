import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';

export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return styles;
};
