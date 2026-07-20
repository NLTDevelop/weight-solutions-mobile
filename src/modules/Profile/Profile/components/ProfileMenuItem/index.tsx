import { useUiContext } from '@/UIProvider';
import React, { useMemo } from 'react';
import { TouchableOpacity, View,Switch } from 'react-native';
import { Typography } from '@/UIKit/Typography';
import { getStyles } from './styles';
import { Chevron } from '@/assets/icons/ChevronIcon';

interface IProps {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
    trailingType?: 'toggle';
    onToggle?: (value: boolean) => void;
    toggleValue?: boolean;
}

export const ProfileMenuItem = ({ title, icon, onPress, trailingType, onToggle, toggleValue }: IProps) => {
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
                ? <Switch value={toggleValue} 
                onValueChange={onToggle} 
                trackColor={{ true: colors.text, false: colors.card_secondary }} 
                thumbColor={colors.card}
                
                />
                : <Chevron position="RIGHT" color={colors.icon_strong} />}
        </TouchableOpacity>
    );
};
