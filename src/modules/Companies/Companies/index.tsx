import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { userModel } from '@/entities/User/UserModel';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { CompanyCard } from './components/CompanyCard';
import { useCompanies } from './presenters/useCompanies';
import { ICompanyCardItem } from './presenters/useCompaniesUi';
import { getStyles } from './styles';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';

export const CompaniesView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { companyCards, isLoading, onPressCreateCompany, onRefresh } = useCompanies();
    const shouldShowCreateButton = userModel.user?.role !== 'superadmin';

    const keyExtractor = (item: ICompanyCardItem) => String(item.id);

    const renderItem: ListRenderItem<ICompanyCardItem> = ({ item }) => {
        return <CompanyCard item={item} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.itemSeparator} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} headerComponent={<HeaderWithBackButton backDisabled title={t('companies.title')} />} >
            <FlatList
                data={companyCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListEmptyComponent={<EmptyListView text='No companies found' />}
                onRefresh={onRefresh}
                refreshing={isLoading}
            />
            {shouldShowCreateButton ? <NLTButton text={t('companies.createButton')} onPress={onPressCreateCompany} /> : null}
        </ScreenContainer>
    );
});
