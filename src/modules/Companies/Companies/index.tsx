import { useUiContext } from '@/UIProvider';
import { SearchIcon } from '@/assets/icons/SearchIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { NLTTextInput } from '@/UIKit/NLTTextInput';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, TouchableOpacity, View } from 'react-native';
import { CompanyCard } from './components/CompanyCard';
import { useCompanies } from './presenters/useCompanies';
import { ICompanyCardItem } from './presenters/useCompaniesUi';
import { getStyles } from './styles';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { BellIcon } from '@/assets/icons/BellIcon';

export const CompaniesView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { companyCards, isLoading, onPressCreateCompany, onRefresh, search, onChangeSearch, onEndReached, onNotificationPress } = useCompanies();

    const keyExtractor = (item: ICompanyCardItem) => String(item.id);

    const renderItem: ListRenderItem<ICompanyCardItem> = ({ item }) => {
        return <CompanyCard item={item} />;
    };

    return (
        <ScreenContainer edges={['top']} headerComponent={(<HeaderWithBackButton backDisabled title={t('companies.title')} 
        rightComponent={( <TouchableOpacity onPress={onNotificationPress}><BellIcon/></TouchableOpacity>)} />)}>
            <View style={styles.header}>
                <NLTTextInput
                    value={search}
                    onChangeText={onChangeSearch}
                    placeholder={t('companies.searchPlaceholder')}
                    shape='pill'
                    hasBottomOffset={false}
                    autoCapitalize='none'
                    autoCorrect={false}
                    containerStyle={styles.searchInputContainer}
                    inputContainerStyle={styles.searchInputInner}
                    LeftAccessory={
                        <View style={styles.searchIcon}>
                            <SearchIcon color={colors.icon_middle} />
                        </View>
                    }
                />
            </View>
            <FlatList
                data={companyCards}
                renderItem={renderItem}
                onEndReached={onEndReached}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<EmptyListView text={t('companies.empty')} isLoading={isLoading} />}
                onRefresh={onRefresh}
                refreshing={isLoading}
                keyboardShouldPersistTaps='handled'
            />
            <NLTButton
                text={t('companies.createButton')}
                onPress={onPressCreateCompany}
                containerStyle={styles.createButton}
                LeftAccessory={<PlusIcon color={colors.icon_strong} />}
            />
        </ScreenContainer>
    );
});
