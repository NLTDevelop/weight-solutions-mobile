import { DashboardIcon } from '@/assets/icons/DashboardIcon';
import { Chevron } from '@/assets/icons/ChevronIcon';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@/UIKit/Typography';
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
            <View style={styles.leftContent}>
                <View style={styles.iconContainer}>
                    <DashboardIcon color={colors.icon_strong} />
                </View>
                <View style={styles.content}>
                    <Typography variant='body_m_bold' text={title} style={styles.title} />
                    <Typography variant='body_s' text={subtitle} style={styles.subtitle} />
                    <Typography variant='body_s' text={description} style={styles.description} />
                </View>
            </View>
            <Chevron color={colors.icon_middle} position="RIGHT" />
        </TouchableOpacity>
    );
};
