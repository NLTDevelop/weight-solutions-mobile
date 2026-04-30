import { ICompanyCardItem } from '../../presenters/useCompaniesUi';
import { Text, TouchableOpacity, View } from 'react-native';
import { getStyles } from './styles';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';

interface IProps {
    item: ICompanyCardItem;
}

export const CompanyCard = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={item.onPress}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.statusText}</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );
};
