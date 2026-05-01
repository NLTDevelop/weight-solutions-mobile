import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { View } from 'react-native';
import { IProductCardItem } from '../../presenters/useProductsUi';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { NLTLabel } from '@/UIKit/NLTLabel';
import { Typography } from '@/UIKit/Typography';

interface IProps {
    item: IProductCardItem;
}

export const ProductCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard onPress={item.onPress}>
            <View style={styles.header}>
                <View style={styles.textWrapper}>
                    <Typography variant={'h2'} text={item.title} />
                </View>
                <NLTLabel value={t(`products.statuses.${item.status}`)} />
            </View>
            {!!item.description && <Typography variant={'body_s'} text={item.description} />}
        </NLTCard>
    );
};
