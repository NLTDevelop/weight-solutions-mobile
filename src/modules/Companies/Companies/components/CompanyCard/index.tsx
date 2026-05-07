import { ICompanyCardItem } from '../../presenters/useCompaniesUi';
import { Text, View } from 'react-native';
import { getStyles } from './styles';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { NLTCard } from '@/UIKit/NLTCard';
import { CompanyIcon } from '@/assets/icons/CompanyIcon';

interface IProps {
    item: ICompanyCardItem;
}

export const CompanyCard = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard onPress={item.onPress} containerStyle={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <CompanyIcon color={colors.icon_strong} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.infoSection}>
                    <Text style={styles.label}>{item.addressLabel}</Text>
                    <Text style={styles.value}>{item.addressValue}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.infoSection}>
                    <Text style={styles.label}>{item.ownerLabel}</Text>
                    <Text style={styles.value}>{item.ownerValue}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.infoSection}>
                    <Text style={styles.label}>{item.phoneLabel}</Text>
                    <Text style={styles.value}>{item.phoneValue}</Text>
                </View>
            </View>
        </NLTCard>
    );
};
