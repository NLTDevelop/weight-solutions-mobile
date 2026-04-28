import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { scaleHorizontal, scaleVertical } from '@/utils';

export const getStyles = (colors: IColors) => {
    const topInset = initialWindowMetrics?.insets.top || 0;
    const bottomInset = initialWindowMetrics?.insets.bottom || 0;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.card,
            paddingTop: topInset,
            paddingBottom: bottomInset,
        },
        header: {
            height: scaleVertical(50),
            width: '100%',
            backgroundColor: colors.card,
            paddingRight: scaleHorizontal(20),
            shadowColor: colors.border_strong,
            shadowOffset: {
                width: 0,
                height: scaleVertical(2),
            },
            shadowOpacity: 0.1,
            elevation: 3,
            zIndex: 2,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        button: {
            height: scaleVertical(50),
            paddingHorizontal: scaleHorizontal(30),
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 18,
            color: colors.primary,
        },
        list: {
            flex: 1,
            paddingVertical: scaleVertical(16),
        },
    });
    return styles;
};
