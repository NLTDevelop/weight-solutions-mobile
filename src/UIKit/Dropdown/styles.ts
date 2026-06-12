import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleFontSize, scaleHorizontal, scaleLineHeight, scaleVertical } from '../../utils';

export const getStyle = (colors: IColors, isOpen: boolean) => {
    return StyleSheet.create({
        container: {
            zIndex: isOpen ? 1000 : 1,
        },
        dropdown: {
            height: scaleVertical(44),
            borderRadius: scaleHorizontal(22),
            borderColor: colors.border,
            backgroundColor: colors.card,
            paddingHorizontal: scaleHorizontal(12),
        },
        dropDownContainerStyle: {
            height: scaleVertical(120),
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderRadius: scaleHorizontal(16),
            overflow: 'hidden',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 4,
        },
        listItemContainerStyle: {
            height: scaleVertical(44),
            padding: 0,
        },
        dropdownSelectedItemContainer: {
            backgroundColor: colors.card,
        },
        item: {
            height: scaleVertical(44),
            justifyContent: 'center',
            paddingHorizontal: scaleHorizontal(12),
            backgroundColor: colors.card,
        },
        textStyle: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(18),
            fontFamily: 'Roboto-Regular',
        },
        placeholderStyle: {
            color: colors.text_light,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Regular',
        },
        selectedItemLabelStyle: {
            color: colors.text_strong,
            fontSize: scaleFontSize(14),
            lineHeight: scaleLineHeight(17),
            fontFamily: 'Roboto-Medium',
        },
        arrowIconStyle: {
            tintColor: colors.icon_strong,
        },
        tickIconStyle: {
            tintColor: colors.primary,
        },
    });
}
