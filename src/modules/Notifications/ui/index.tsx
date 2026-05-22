import { useUiContext } from '@/UIProvider';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { IRoute, NLTTabView } from '@/UIKit/NLTTabView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useNotifications } from '../presenters/useNotifications';
import { INotificationCard } from '../types/INotificationCard';
import { getStyles } from './styles';
import { NotificationCard } from './components/NotificationCard';

export const NotificationsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [tabIndex, setTabIndex] = useState(0);
    const { notificationCards, isLoading, onEndReached, onRefresh, onSelectStatus } = useNotifications();

    const routes = useMemo<IRoute[]>(() => [
        { key: NotificationStatusEnum.ALL, title: t('notifications.tabs.all') },
        { key: NotificationStatusEnum.UNREAD, title: t('notifications.tabs.unread') },
        { key: NotificationStatusEnum.READ, title: t('notifications.tabs.read')}
    ], [t]);

    const renderScene = () => (
        <NotificationsScene
            notificationCards={notificationCards}
            isLoading={isLoading}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
        />
    );

    return (
        <ScreenContainer
            edges={['top']}
            headerComponent={<HeaderWithBackButton title={t('notifications.title')} isCenterPlacement={true} />}
        >
            <NLTTabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={(index) => {
                    const selectedRoute = routes[index];

                    if (!selectedRoute) {
                        return;
                    }

                    setTabIndex(index);
                    onSelectStatus(selectedRoute.key as NotificationStatusEnum);
                }}
                tabBarViewStyle={styles.tabBarView}
                tabBarStyle={styles.tabBar}
                indicatorStyle={styles.tabIndicator}
                labelStyle={styles.tabLabel}
                activeColor={colors.text_strong}
                inactiveColor={colors.text_middle}
            />
        </ScreenContainer>
    );
});

interface INotificationsSceneProps {
    notificationCards: INotificationCard[];
    isLoading: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
}

const NotificationsScene = observer(({ notificationCards, isLoading, onEndReached, onRefresh }: INotificationsSceneProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const renderItem: ListRenderItem<INotificationCard> = ({ item }) => (
        <NotificationCard item={item}/>
    );

    return (
        <FlatList
            data={notificationCards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={isLoading}
            style={styles.list}
            contentContainerStyle={styles.contentContainerStyle}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListEmptyComponent={isLoading ? null : (
                <View style={styles.emptyState}>
                    <Typography variant='h3' text={t('notifications.emptyStateTitle')} style={styles.emptyTitle} />
                    <Typography variant='body_m' text={t('notifications.emptyStateDescription')} style={styles.emptyDescription} />
                </View>
            )}
        />
    );
});

