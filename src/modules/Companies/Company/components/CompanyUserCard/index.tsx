import { useUiContext } from '@/UIProvider';
import { EditIcon } from '@/assets/icons/EditIcon';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ICompanyUserCard } from '../../types/ICompanyUserCard';
import { getStyles } from './styles';

interface IProps {
    item: ICompanyUserCard;
}

export const CompanyUserCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={item.onPress} activeOpacity={0.85}>
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
            <View style={styles.infoBlock}>
                <Text style={styles.label}>{t('users.email')}:</Text>
                <Text style={styles.value}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );
};
