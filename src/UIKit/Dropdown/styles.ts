import { StyleSheet } from 'react-native';
import { IColors } from '@/UIProvider/theme/IColors';
import { scaleVertical } from '../../utils';

export const getStyle = (colors: IColors) => {
    return StyleSheet.create({
        dropdown: {
            borderRadius: 6,
            borderColor: colors.border,
            paddingHorizontal: 16,
            minHeight: scaleVertical(36),
        },
        dropDownContainerStyle: {
            borderColor: colors.border,
        },
        listItemContainerStyle: {
            paddingHorizontal: 16,
        },
        dropdownSelectedItemContainer: {
            height: scaleVertical(36),
            backgroundColor: colors.primary + '14'
        }
    });
}
