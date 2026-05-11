import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { NLTButton } from '@/UIKit/NLTButton';
import { observer } from 'mobx-react';
import { ListRenderItem, FlatList, View } from 'react-native';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { useUiContext } from '@/UIProvider';
import { IProductCardItem } from '../../presenters/useProductsUi';
import { ProductCard } from '../ProductCard';
import { getStyles } from '../../styles';
import { useMemo } from 'react';

interface IProps {
    productCards: IProductCardItem[];
    isLoading: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
    onPressCreateProduct: () => void;
}

export const ProductsScene = observer(({ productCards, isLoading, onEndReached, onRefresh, onPressCreateProduct }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const keyExtractor = (item: IProductCardItem) => String(item.id);

    const renderItem: ListRenderItem<IProductCardItem> = ({ item }) => {
        return <ProductCard item={item} />;
    };

    return (
        <View style={styles.scene}>
            <FlatList
                data={productCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                ListEmptyComponent={<EmptyListView text={t('products.empty')} isLoading={isLoading} />}
                onRefresh={onRefresh}
                refreshing={isLoading}
                style={styles.list}
                contentContainerStyle={styles.contentContainerStyle}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
            <View style={styles.footer}>
                <NLTButton
                    text={t('products.createButton')}
                    onPress={onPressCreateProduct}
                    LeftAccessory={<PlusIcon color={colors.icon_strong} />}
                />
            </View>
        </View>
    );
});
