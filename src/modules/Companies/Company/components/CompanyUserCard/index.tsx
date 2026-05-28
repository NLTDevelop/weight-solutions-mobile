import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ICompanyUserCard } from '../../types/ICompanyUserCard';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTInfoRow } from '@/UIKit/NLTInfoRow';

interface IProps {
    item: ICompanyUserCard;
}

export const CompanyUserCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard containerStyle={styles.container} onPress={item.onPress} >
            <View style={styles.headerRow}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={item.onPressEdit} hitSlop={8}>
                    <EditIcon color={colors.icon_strong} />
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <NLTInfoRow label={t('users.email')} value={item.email} />
        </NLTCard>
    );
};
