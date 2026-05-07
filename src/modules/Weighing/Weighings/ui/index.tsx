import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { userModel } from '@/entities/User/UserModel';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { WeighingCard } from './components/WeighingCard';
import { useWeighings } from './presenters/useWeighings';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { getStyles } from './styles';

export const WeighingsView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { weighingCards, isLoading, onRefresh, onPressCreateWeighing } = useWeighings();
    const shouldShowCreateButton = userModel.user?.role !== 'user';

    const keyExtractor = (item: IWeighingCardItem) => String(item.id);

    const renderItem: ListRenderItem<IWeighingCardItem> = ({ item }) => {
        return <WeighingCard item={item} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.itemSeparator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            headerComponent={<HeaderWithBackButton backDisabled title={t('weighings.title')} />}
        >
            <FlatList
                data={weighingCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListEmptyComponent={<EmptyListView text={t('weighings.empty')} isLoading={isLoading} />}
                onRefresh={onRefresh}
                refreshing={isLoading}
                style={styles.list}
                contentContainerStyle={styles.contentContainerStyle}
            />
            {shouldShowCreateButton ? <NLTButton text={t('weighings.createButton')} onPress={onPressCreateWeighing} /> : null}
        </ScreenContainer>
    );
});
