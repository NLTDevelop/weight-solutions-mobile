import { useUiContext } from '@/UIProvider';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTLabel } from '@/UIKit/NLTLabel';
import { Typography } from '@/UIKit/Typography';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { EditIcon } from '@/assets/icons/EditIcon';
import { getStyles } from './styles';

interface IProps {
    item: IWeighingCardItem;
}

export const WeighingCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const productName = item.productName.startsWith('weighings.') ? t(item.productName) : item.productName;
    const firstWeighingAt = item.firstWeighingAt.startsWith('weighings.') ? t(item.firstWeighingAt) : item.firstWeighingAt;
    const secondWeighingAt = item.secondWeighingAt.startsWith('weighings.') ? t(item.secondWeighingAt) : item.secondWeighingAt;
    const netWeight = item.netWeight.startsWith('weighings.') ? t(item.netWeight) : item.netWeight;
    const actionLabel = t(item.actionLabel);

    return (
        <NLTCard onPress={item.onPress}>
            <View style={styles.header}>
                <Typography variant='h5' text={item.recordNumber} />
                <NLTLabel value={t(`weighings.statuses.${item.status}`)} />
            </View>
            <View style={styles.content}>
                <View>
                    <Typography variant='body_xs' text={t('weighings.carNumberLabel')} style={styles.label} />
                    <Typography variant='body_m' text={item.carNumber} style={styles.value} />
                </View>
                <View style={styles.separator} />
                <View>
                    <Typography variant='body_xs' text={t('weighings.firstWeightDateTimeLabelShort')} style={styles.label} />
                    <Typography variant='body_m' text={firstWeighingAt} style={styles.value} />
                </View>
                <View style={styles.separator} />
                <View>
                    <Typography variant='body_xs' text={t('weighings.secondWeightDateTimeLabelShort')} style={styles.label} />
                    <Typography variant='body_m' text={secondWeighingAt} style={styles.value} />
                </View>
                <View style={styles.separator} />
                <View>
                    <Typography variant='body_xs' text={t('weighings.cargoTypeLabelShort')} style={styles.label} />
                    <Typography variant='body_m' text={productName} style={styles.value} />
                </View>
                <View style={styles.separator} />
                <View>
                    <Typography variant='body_xs' text={t('weighings.netWeightLabel')} style={styles.label} />
                    <Typography variant='body_m' text={netWeight} style={styles.value} />
                </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={item.onActionPress}>
                <EditIcon color={colors.icon_strong} />
                <Typography variant='body_m' text={actionLabel} style={styles.actionText} />
            </TouchableOpacity>
        </NLTCard>
    );
};
