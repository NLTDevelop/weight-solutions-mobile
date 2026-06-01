import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { NLTButton } from '@/UIKit/NLTButton';
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
    const { onPressCreateWeighing } = useWeighings();
   
    const routes = useMemo<IRoute[]>(() => [
        { key: OrderListDtoStatusEnum.ACTIVE, title: t('weighings.tabs.active') },
        { key: OrderListDtoStatusEnum.ARCHIVE, title: t('weighings.tabs.completed') },
    ], [t]);

    const renderScene = ({ route }: { route: IRoute; }) => {
        return (
            <WeighingsScene
                key={route.key}
                status={route.key as OrderListDtoStatusEnum}
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
            <NLTTabView
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                onIndexChange={setTabIndex}
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
