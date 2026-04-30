import { Chevron } from '@/assets/icons/ChevronIcon';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    title: string;
    subtitle: string;
    description: string;
    onPress: () => void;
}

export const LinkedObjectCard = ({ title, subtitle, description, onPress }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Chevron color={colors.icon_middle} position="RIGHT" />
        </TouchableOpacity>
    );
};
