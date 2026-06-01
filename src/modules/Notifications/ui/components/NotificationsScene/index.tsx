import { useUiContext } from '@/UIProvider';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';
import { Typography } from '@/UIKit/Typography';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useNotificationsScene } from '@/modules/Notifications/presenters/useNotificationsScene';
import { INotificationCard } from '@/modules/Notifications/types/INotificationCard';
import { NotificationCard } from '../NotificationCard';
import { getStyles } from '../../styles';

interface IProps {
    status: NotificationStatusEnum;
    refreshKey: number;
    onNotificationsChanged: () => void;
}

export const NotificationsScene = observer(({ status, refreshKey, onNotificationsChanged }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { notificationCards, isLoading, onEndReached, onRefresh } = useNotificationsScene({
        status,
        refreshKey,
        onNotificationsChanged,
    });

    const renderItem: ListRenderItem<INotificationCard> = ({ item }) => (
        <NotificationCard item={item} />
    );

    return (
        <FlatList
            data={notificationCards}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={false}
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
