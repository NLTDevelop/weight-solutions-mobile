import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';
import { Text, View, ViewStyle } from 'react-native';
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown';

type DropdownItem = { label: string, value: string | number };

interface IProps {
    value: string | number | null;
    items: DropdownItem[];
    placeholder?: string;
    setValue: (value: { label?: string, value: string | number }) => void;
    containerStyle?: ViewStyle;
    zIndex?: number;
}

export const Dropdown: FC<IProps> = memo(({ value, items, placeholder, setValue, containerStyle, zIndex }) => {
    const { colors } = useUiContext();
    const [open, setOpen] = useState(false);
    const styles = useMemo(() => getStyle(colors, open), [colors, open]);

    const onChange = useCallback((item: DropdownItem) => {
        setValue({ label: item.label, value: item.value });
        setOpen(false);
    }, [setValue]);

    const renderItem = useCallback((item: DropdownItem, selected?: boolean) => (
        <View style={styles.item}>
            <Text style={[styles.textStyle, selected ? styles.selectedItemLabelStyle : null]}>
                {item.label}
            </Text>
        </View>
    ), [styles]);

    return (
        <View style={[styles.container, containerStyle, zIndex ? { zIndex } : null]}>
            <NativeDropdown
                style={styles.dropdown}
                containerStyle={styles.dropDownContainerStyle}
                itemContainerStyle={styles.listItemContainerStyle}
                itemTextStyle={styles.textStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedItemLabelStyle}
                iconStyle={styles.arrowIconStyle}
                data={items}
                labelField="label"
                valueField="value"
                value={value}
                placeholder={placeholder}
                activeColor={colors.card}
                maxHeight={styles.dropDownContainerStyle.height}
                autoScroll={false}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={onChange}
                renderItem={renderItem}
                flatListProps={{
                    nestedScrollEnabled: true,
                }}
            />
        </View>
    );
});
