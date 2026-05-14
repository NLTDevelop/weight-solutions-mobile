import { useUiContext } from '@/UIProvider';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTButton } from '@/UIKit/NLTButton';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { PhoneBanner } from '@/UIKit/PhoneBanner';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { IRoute, NLTTabView } from '@/UIKit/NLTTabView';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { WeighingsScene } from './components/WeighingsScene';
import { useWeighings } from './presenters/useWeighings';
import { getStyles } from './styles';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';

export const WeighingsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [tabIndex, setTabIndex] = useState(0);
    const { weighingCards, search, isLoading, onRefresh, onEndReached, onChangeSearch, onSelectStatus, onPressCreateWeighing } = useWeighings();
   
    const routes = useMemo<IRoute[]>(() => [
        { key: OrderListDtoStatusEnum.ACTIVE, title: t('weighings.tabs.active') },
        { key: OrderListDtoStatusEnum.ARCHIVE, title: t('weighings.tabs.completed') },
    ], [t]);

    const renderScene = ({ route }: { route: IRoute; }) => {
        return (
            <WeighingsScene
                key={route.key}
                weighingCards={weighingCards}
                isLoading={isLoading}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
            />
        );
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            contentContainerStyle={styles.root}
            headerComponent={<HeaderWithBackButton title={t('weighings.title')} />}
        >
            <PhoneBanner containerStyle={styles.phoneContainerStyle}/>
            <View style={styles.searchContainer}>
                <NLTTextInput
                    value={search}
                    onChangeText={onChangeSearch}
                    placeholder={t('weighings.searchPlaceholder')}
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
                    onSelectStatus(routes[index].key as OrderListDtoStatusEnum.ACTIVE | OrderListDtoStatusEnum.ARCHIVE);
                }}
                tabBarStyle={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                labelStyle={styles.tabLabel}
                activeColor={colors.text_strong}
                inactiveColor={colors.text_middle}
                sceneContainerStyle={styles.sceneContainer}
            />
            <View style={styles.footer}>
                <NLTButton text={t('weighings.startButton')} onPress={onPressCreateWeighing} />
            </View>
        </ScreenContainer>
    );
});
