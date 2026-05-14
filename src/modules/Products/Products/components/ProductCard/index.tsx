import { useUiContext } from '@/UIProvider';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { IProductCardItem } from '../../presenters/useProductsUi';
import { getStyles } from './styles';

interface IProps {
    item: IProductCardItem;
}

export const ProductCard = ({ item }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    return (
        <TouchableOpacity style={styles.container} onPress={item.onPress} activeOpacity={0.85}>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description || t('products.descriptionFallback')}</Text>
            </View>
        </TouchableOpacity>
    );
};
