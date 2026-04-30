import React, { FC, useMemo, memo } from 'react';
import { DimensionValue, View, Text } from 'react-native';
import { useUiContext } from '@/UIProvider';
import { getStyle } from './styles';

interface IProps {
    progressPercent?: number;
    amount?: number;
    total?: number;
}

export const NLTProgressBar: FC<IProps> = memo(({ progressPercent, amount, total }) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyle(colors), [colors]);

    const width = useMemo(() => {
        let result: DimensionValue = '0%';
        if (progressPercent) {
            result = `${progressPercent}%`;
        } else if (amount && total) {
            result = `${(amount / total) * 100}%`;
        }
        return result;
    }, [progressPercent, amount, total])

    return (
        <View style={styles.container} >
            <View style={styles.progressBar}>
                <View style={[styles.progressLine, { width }]} />
            </View>
            <Text style={styles.progressText}>{width}</Text>
        </View >
    );
});
