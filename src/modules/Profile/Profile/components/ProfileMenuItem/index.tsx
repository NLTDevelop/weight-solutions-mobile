import { Chevron } from '@/assets/icons/ChevronIcon';
import { IProfileMenuItem } from '@/modules/Profile/types/IProfileMenuItem';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    item: IProfileMenuItem;
}

export const ProfileMenuItem = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={item.onPress}>
            <View style={styles.content}>
                <Text style={[styles.title, item.isDestructive ? styles.destructiveTitle : undefined]}>{item.title}</Text>
                {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
            </View>
            <Chevron color={item.isDestructive ? colors.error : colors.icon_middle} position="RIGHT" />
        </TouchableOpacity>
    );
};
