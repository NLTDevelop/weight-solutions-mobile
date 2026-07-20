import { useUiContext } from '@/UIProvider';
import { Typography } from '@/UIKit/Typography';
import { useMemo } from 'react';
import { View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    isConnected: boolean;
}

export const ScaleConnectionIndicator = ({ isConnected }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors, isConnected), [colors, isConnected]);

    return (
        <View style={styles.container}>
            <View style={styles.dot} />
            <Typography
                variant='body_xs'
                text={t(isConnected ? 'weighings.scaleConnected' : 'weighings.scaleDisconnected')}
            />
        </View>
    );
};

