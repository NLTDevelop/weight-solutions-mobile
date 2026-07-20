import { memo, useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { useUiContext } from '../../UIProvider';
import { getStyles } from './styles';

interface IProps {
    children: React.ReactNode;
    onPress?: () => void;
    containerStyle?: ViewStyle;
}

export const NLTCard = memo(({ children, onPress, containerStyle }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress} disabled={!onPress}>
            {children}
        </TouchableOpacity>
    );
});
