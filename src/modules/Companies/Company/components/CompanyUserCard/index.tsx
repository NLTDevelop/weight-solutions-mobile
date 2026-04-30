import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ICompanyUserCard } from '../../types/ICompanyUserCard';
import { getStyles } from './styles';

interface IProps {
    item: ICompanyUserCard;
}

export const CompanyUserCard = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={item.onPress}>
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.status}>{item.status}</Text>
        </TouchableOpacity>
    );
};
