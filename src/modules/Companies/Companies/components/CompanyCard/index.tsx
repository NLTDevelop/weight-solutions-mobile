import { ICompanyCardItem } from '../../presenters/useCompaniesUi';
import { Text, View } from 'react-native';
import { getStyles } from './styles';
import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { NLTCard } from '@/UIKit/NLTCard';
import { CompanyIcon } from '@/assets/icons/CompanyIcon';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';

interface IProps {
    item: ICompanyCardItem;
}

export const CompanyCard = ({ item }: IProps) => {
    const { colors } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard onPress={item.onPress} containerStyle={styles.container}>
            <View style={styles.header}>
                <CompanyIcon color={colors.icon_strong} />
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <NLTInfoRow label={item.addressLabel} value={item.ownerValue} />
                <View style={styles.separator} />
                <NLTInfoRow label={item.ownerLabel} value={item.addressValue} />
                <View style={styles.separator} />
                <NLTInfoRow label={item.phoneLabel} value={item.phoneValue} />
            </View>
        </NLTCard>
    );
};
