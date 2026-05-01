import { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useUiContext } from '../../UIProvider';
import { getStyles } from './styles';
import { Typography } from '../Typography';

interface IProps {
    label: string;
    value: string | number;
    containerStyle?: ViewStyle;
}

export const NLTRow = memo(({ label, value }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container} >
            <Typography variant='body_s' text={label} />
            <Typography variant='body_m_bold' text={String(value)} />
        </View>
    );
});
