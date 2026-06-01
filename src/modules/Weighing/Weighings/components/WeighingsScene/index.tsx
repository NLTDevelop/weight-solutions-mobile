import { useUiContext } from '@/UIProvider';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { observer } from 'mobx-react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useMemo } from 'react';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { WeighingCard } from '../WeighingCard';
import { getStyles } from '../../styles';
import { useWeighingsScene } from '../../presenters/useWeighingsScene';

interface IProps {
    status: OrderListDtoStatusEnum;
}

export const WeighingsScene = observer(({ status }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { search, isLoading, weighingCards, onEndReached, onRefresh, onChangeSearch } = useWeighingsScene({ status });

    const renderItem: ListRenderItem<IWeighingCardItem> = ({ item }) => {
        return <WeighingCard item={item} />;
    };

    return (
        <View style={styles.root}>
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
            <FlatList
                data={weighingCards}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
                refreshing={false}
                style={styles.list}
                contentContainerStyle={styles.contentContainerStyle}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                ListEmptyComponent={<EmptyListView text={t('weighings.empty')} isLoading={isLoading} />}
            />
        </View>
    );
});
