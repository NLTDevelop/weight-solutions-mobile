import { useUiContext } from '@/UIProvider';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTLabel } from '@/UIKit/NLTLabel';
import { Typography } from '@/UIKit/Typography';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { useMemo } from 'react';
import { View } from 'react-native';
import { getStyles } from './styles';

interface IProps {
    item: IWeighingCardItem;
}

export const WeighingCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const productName = item.productName.startsWith('weighings.') ? t(item.productName) : item.productName;
    const createdAt = item.createdAt.startsWith('weighings.') ? t(item.createdAt) : item.createdAt;
    const netWeight = item.netWeight.startsWith('weighings.') ? t(item.netWeight) : item.netWeight;

    return (
        <NLTCard onPress={item.onPress}>
            <View style={styles.header}>
                <Typography variant='h5' text={item.recordNumber} />
                <NLTLabel value={t(`weighings.statuses.${item.status}`)} />
            </View>
            <Typography variant='h4' text={productName} style={styles.productName} />
            <View style={styles.metaRow}>
                <Typography variant='body_s' text={item.carNumber} style={styles.metaText} />
                <Typography variant='body_s' text={createdAt} style={styles.metaText} />
            </View>
            <Typography variant='body_m_bold' text={`${t('weighings.netWeightLabel')}: ${netWeight}`} />
        </NLTCard>
    );
};
