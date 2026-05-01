import { useUiContext } from '@/UIProvider';
import { Button } from '@/UIKit/Button';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './presenters/useProducts';
import { IProductCardItem } from './presenters/useProductsUi';
import { getStyles } from './styles';

export const ProductsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { productCards, isLoading, onRefresh, onPressCreateProduct } = useProducts();

    const keyExtractor = (item: IProductCardItem) => String(item.id);

    const renderItem: ListRenderItem<IProductCardItem> = ({ item }) => {
        return <ProductCard item={item} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.itemSeparator} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} headerComponent={<HeaderWithBackButton backDisabled title={t('products.title')} />}>
            <FlatList
                data={productCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListEmptyComponent={<EmptyListView text={t('products.empty')} isLoading={isLoading} />}
                onRefresh={onRefresh}
                refreshing={isLoading}
                style={styles.list}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <Button text={t('products.createButton')} onPress={onPressCreateProduct} />
        </ScreenContainer>
    );
});
