import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight } from '@/utils';

export const getStyle = (colors: IColors, backDisabled?: boolean, isCenterPlacement?: boolean) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: '100%',
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 16,
        },
        button: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: backDisabled || isCenterPlacement ? 'center' : 'flex-start',
        },
        title: {
            fontSize: scaleFontSize(18),
            lineHeight: scaleLineHeight(22),
            fontWeight: '500',
            fontFamily: 'Roboto-Regular',
            color: colors.text,
        },
        emptyView: {
            width: scaleHorizontal(40),
        }
    });
    return styles;
}