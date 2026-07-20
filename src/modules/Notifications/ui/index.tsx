import { useUiContext } from '@/UIProvider';
import { NotificationStatusEnum } from '@/entities/Notification/enums/NotificationStatusEnum';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { IRoute, NLTTabView } from '@/UIKit/NLTTabView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { TextButton } from '@/UIKit/textButton';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { useNotifications } from '../presenters/useNotifications';
import { getStyles } from './styles';
import { NotificationsScene } from './components/NotificationsScene';

export const NotificationsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const [tabIndex, setTabIndex] = useState(0);
    const { refreshKey, isReadAllLoading, onReadAll, onNotificationsChanged } = useNotifications();

    const routes = useMemo<IRoute[]>(() => [
        { key: NotificationStatusEnum.ALL, title: t('notifications.tabs.all') },
        { key: NotificationStatusEnum.UNREAD, title: t('notifications.tabs.unread') },
        { key: NotificationStatusEnum.READ, title: t('notifications.tabs.read')}
    ], [t]);

    const renderScene = ({ route }: { route: IRoute; }) => (
        <NotificationsScene
            status={route.key as NotificationStatusEnum}
            refreshKey={refreshKey}
            onNotificationsChanged={onNotificationsChanged}
        />
    );

    return (
        <ScreenContainer
            edges={['top']}
            headerComponent={(
                <HeaderWithBackButton
                    title={t('notifications.title')}
                    rightComponent={(
                        <TextButton
                            text={isReadAllLoading ? t('notifications.loadingReadAll') : t('notifications.readAllButton')}
                            onPress={onReadAll}
                        />
                    )}
                />
            )}
        >
            <NLTTabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
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
