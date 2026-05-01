import { memo, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useUiContext } from '../../UIProvider';
import { getStyles } from './styles';

interface IProps {
    children: React.ReactNode;
    onPress: () => void;
}

export const NLTCard = memo(({ children, onPress }: IProps) => {
    const { colors} = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={!onPress}>
            {children}
        </TouchableOpacity>
    );
});
