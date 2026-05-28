import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    label: string;
    value: string;
}

export const NLTInfoRow = ({ label, value }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};
