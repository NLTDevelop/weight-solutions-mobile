import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { IProductCardItem } from '../../presenters/useProductsUi';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';

interface IProps {
    item: IProductCardItem;
}

export const ProductCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <NLTCard onPress={item.onPress}>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description || t('products.descriptionFallback')}</Text>
            </View>
        </NLTCard>
    );
};
