import React, { FC, memo, useMemo } from 'react';
import { Text, TextProps, } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps extends TextProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body_xl' | 'body_l' | 'body_l_bold' | 'body_m' | 'body_m_bold' | 'body_s' | 'body_s_bold' | 'body_xs';
    text?: string;
}

export const Typography: FC<IProps> = memo(({ variant = 'body_l', text, ...props }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    return (<Text {...props} style={[styles[variant], props.style]} >{text}</Text>)
})
