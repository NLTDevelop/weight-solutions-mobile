import { useUiContext } from '@/UIProvider';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { getStyles } from './styles';

export const NLTSeparator = observer(() => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (<View style={styles.separator} />);
});
