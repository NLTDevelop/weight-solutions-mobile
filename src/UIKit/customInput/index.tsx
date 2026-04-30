import React, { FC, memo, useMemo } from 'react';
import { TextInput } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps extends Partial<React.ComponentProps<typeof TextInput>> {

}

export const CustomInput: FC<IProps> = memo((props) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return <TextInput placeholderTextColor={colors.inactiveText} {...props} style={[styles.input, props.style]} />
});
