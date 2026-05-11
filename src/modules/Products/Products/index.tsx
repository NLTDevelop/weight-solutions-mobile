import { useUiContext } from '@/UIProvider';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './presenters/useProducts';
import { IProductCardItem } from './presenters/useProductsUi';
import { getStyles } from './styles';

export const ProductsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { productCards, searchQuery, status, isLoading, onRefresh, onChangeSearchQuery, onSelectActive, onSelectInactive, onPressCreateProduct } = useProducts();

    const keyExtractor = (item: IProductCardItem) => String(item.id);

    const renderItem: ListRenderItem<IProductCardItem> = ({ item }) => {
        return <ProductCard item={item} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            containerStyle={styles.screen}
            headerComponent={(
                <View style={styles.headerContainer}>
                    <HeaderWithBackButton backDisabled title={t('products.title')} />
                    <View style={styles.searchContainer}>
                        <NLTTextInput
                            value={searchQuery}
                            onChangeText={onChangeSearchQuery}
                            placeholder={t('products.searchPlaceholder')}
                            shape='pill'
                            hasBottomOffset={false}
                            containerStyle={styles.searchInputContainer}
                            inputContainerStyle={styles.searchInputInner}
                            LeftAccessory={<SearchIcon color={colors.icon_middle} />}
                        />
                    </View>
                </View>
            )}
        >
            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tab, status === 'active' && styles.tabActive]} onPress={onSelectActive} activeOpacity={0.85}>
                    <Text style={styles.tabLabel}>{t('products.tabs.active')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, status === 'inactive' && styles.tabActive]} onPress={onSelectInactive} activeOpacity={0.85}>
                    <Text style={styles.tabLabel}>{t('products.tabs.inactive')}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={productCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
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
                    containerStyle={styles.button}
                    textStyle={styles.buttonText}
                    LeftAccessory={<PlusIcon color={colors.icon_strong} />}
                />
            </View>
        </ScreenContainer>
    );
});
