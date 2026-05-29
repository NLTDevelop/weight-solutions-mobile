import { memo, useMemo } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { useUiContext } from '../../UIProvider';
import { getStyles } from './styles';
import { Typography } from '../Typography';

interface IProps {
    value: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const NLTLabel = memo(({ containerStyle, textStyle, value }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={[styles.container, containerStyle]}>
            <Typography variant={'body_s'} text={value} style={textStyle}/>
        </View>
    );
});
