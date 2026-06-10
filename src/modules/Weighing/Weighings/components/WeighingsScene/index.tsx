import { useUiContext } from '@/UIProvider';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { OrderListDtoStatusEnum } from '@/entities/Order/enums/OrderListDtoStatusEnum';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { observer } from 'mobx-react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import { IWeighingCardItem } from '@/modules/Weighing/types/IWeighingCardItem';
import { WeighingCard } from '../WeighingCard';
import { WeighingsFiltersModal } from '../WeighingsFiltersModal';
import { getStyles } from '../../styles';
import { useWeighingsScene } from '../../presenters/useWeighingsScene';
import { FilterIcon } from '@/assets/icons/FilterIcon';

interface IProps {
    status: OrderListDtoStatusEnum;
}

export const WeighingsScene = observer(({ status }: IProps) => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        search,
        isLoading,
        weighingCards,
        filters,
        isFiltersVisible,
        hasActiveFilters,
        markedDates,
        onEndReached,
        onRefresh,
        onChangeSearch,
        onSelectFilterType,
        onToggleFilters,
        onDayPress,
        onApplyFilters,
        onClearFilters,
    } = useWeighingsScene({ status });

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
                    containerStyle={styles.inputContainerStyle}
                    inputContainerStyle={styles.searchInputInner}
                    LeftAccessory={<SearchIcon color={colors.icon_middle} />}
                />
                <TouchableOpacity style={styles.filterButton} onPress={onToggleFilters}>
                    <FilterIcon color={colors.icon_strong} />
                    {hasActiveFilters && <View style={styles.filterIndicator} />}
                </TouchableOpacity>
            </View>
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
            <WeighingsFiltersModal
                isVisible={isFiltersVisible}
                type={filters.type}
                range={{ startDate: filters.startDate, endDate: filters.endDate }}
                markedDates={markedDates}
                onClose={onToggleFilters}
                onSelectType={onSelectFilterType}
                onDayPress={onDayPress}
                onApplyFilters={onApplyFilters}
                onClearFilters={onClearFilters}
            />
        </View>
    );
});
