import { ICompanyCardItem } from '../../presenters/useCompaniesUi';
import { Text, View } from 'react-native';
import { getStyles } from './styles';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { NLTCard } from '@/UIKit/NLTCard';

interface IProps {
    item: ICompanyCardItem;
}

export const CompanyCard = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard onPress={item.onPress}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.statusText}</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </NLTCard>
    );
};
