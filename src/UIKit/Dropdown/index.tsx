import React, { FC, memo, useMemo, useState } from 'react';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { ViewStyle } from 'react-native';

interface IProps {
    value: string | number | null;
    items: { label: string, value: string | number }[];
    placeholder?: string;
    setValue: (value: { label?: string, value: string | number }) => void;
    containerStyle?: ViewStyle;
    zIndex?: number;
}

DropDownPicker.setListMode("SCROLLVIEW");

export const Dropdown: FC<IProps> = memo(({ value, items, placeholder, setValue, containerStyle, zIndex }) => {
    const { colors } = useUiContext();
    const [open, setOpen] = useState(false);
    const styles = useMemo(() => getStyle(colors, open), [colors, open]);
    const NativeDropdown = DropDownPicker as any;

    return (
        <NativeDropdown
            closeOnBackPressed={true}
            containerStyle={[styles.container, containerStyle, { zIndex }]}
            style={styles.dropdown}
            selectedItemContainerStyle={styles.dropdownSelectedItemContainer}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            textStyle={styles.textStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedItemLabelStyle={styles.selectedItemLabelStyle}
            arrowIconStyle={styles.arrowIconStyle as any}
            tickIconStyle={styles.tickIconStyle as any}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            onSelectItem={(item: { label?: string; value?: string | number; }) => setValue({ label: item.label, value: item.value ?? '' })}
            placeholder={placeholder}
            showTickIcon={false}
            scrollViewProps={{
                nestedScrollEnabled: true,
            }}
        />
    )
});
