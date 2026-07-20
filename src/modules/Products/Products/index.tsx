import { useUiContext } from '@/UIProvider';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { IRoute, NLTTabView } from '@/UIKit/NLTTabView';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ProductsScene } from './components/ProductsScene';
import { useProducts } from './presenters/useProducts';
import { getStyles } from './styles';

export const ProductsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [tabIndex, setTabIndex] = useState(0);
    const { productCards, searchQuery, isLoading, onEndReached, onRefresh, onChangeSearchQuery, onSelectStatus, onPressCreateProduct } = useProducts();

    const routes = useMemo<IRoute[]>(() => [
        { key: 'active', title: t('products.tabs.active') },
        { key: 'inactive', title: t('products.tabs.inactive') },
    ], [t]);

    const renderScene = ({ route }: { route: IRoute; }) => {
        return (
            <ProductsScene
                key={route.key}
                productCards={productCards}
                isLoading={isLoading}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                onPressCreateProduct={onPressCreateProduct}
            />
        );
    };

    return (
        <ScreenContainer edges={['top']} headerComponent={<HeaderWithBackButton backDisabled title={t('products.title')} />}>
            <View style={styles.searchContainer}>
                <NLTTextInput
                    value={searchQuery}
                    onChangeText={onChangeSearchQuery}
                    placeholder={t('products.searchPlaceholder')}
                    shape='pill'
                    hasBottomOffset={false}
                    inputContainerStyle={styles.searchInputInner}
                    LeftAccessory={<SearchIcon color={colors.icon_middle} />}
                />
            </View>
            <NLTTabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={(index) => {
                    setTabIndex(index);
                    onSelectStatus(routes[index].key);
                }}
                tabBarStyle={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                labelStyle={styles.tabLabel}
                activeColor={colors.text_strong}
                inactiveColor={colors.text_middle}
            />
        </ScreenContainer>
    );
});
