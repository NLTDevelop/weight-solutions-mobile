import { useUiContext } from '@/UIProvider';
import { Typography } from '@/UIKit/Typography';
import { useMemo } from 'react';
import { View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    label: string;
    value: string;
}

export const PersonalDataRow = ({ label, value }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <Typography variant='body_xs' text={label} style={styles.label} />
            <Typography variant='body_m_bold' text={value} style={styles.value} />
        </View>
    );
};
