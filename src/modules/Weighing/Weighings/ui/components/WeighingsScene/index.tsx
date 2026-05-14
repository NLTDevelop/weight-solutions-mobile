import { useUiContext } from '@/UIProvider';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { observer } from 'mobx-react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useMemo } from 'react';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { WeighingCard } from '../WeighingCard';
import { getStyles } from '../../styles';

interface IProps {
    weighingCards: IWeighingCardItem[];
    isLoading: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
}

export const WeighingsScene = observer(({ weighingCards, isLoading, onEndReached, onRefresh }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);

    const renderItem: ListRenderItem<IWeighingCardItem> = ({ item }) => {
        return <WeighingCard item={item} />;
    };

    return (
        <FlatList
            data={weighingCards}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={isLoading}
            style={styles.list}
            contentContainerStyle={styles.contentContainerStyle}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListEmptyComponent={<EmptyListView text={t('weighings.empty')} isLoading={isLoading} />}
        />
    );
});
