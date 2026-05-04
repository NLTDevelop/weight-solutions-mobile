import { useUiContext } from '@/UIProvider';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@/UIKit/Typography';
import { getStyles } from './styles';
import { Chevron } from '@/assets/icons/ChevronIcon';

interface IProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
    trailingType?: 'toggle';
}

export const ProfileMenuItem = ({ title, icon, onPress, trailingType }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContent}>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View style={styles.content}>
                    <Typography variant='body_m' text={title} />
                </View>
            </View>
            {trailingType === 'toggle'
                ? <View style={[styles.toggleTrack]}>
                    <View style={[styles.toggleKnob]} />
                </View>
                : <Chevron position="RIGHT" color={colors.icon_strong} />}
        </TouchableOpacity>
    );
};
