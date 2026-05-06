import { useUiContext } from '@/UIProvider';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader2';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { CompanyUserCard } from './components/CompanyUserCard';
import { InfoRow } from './components/InfoRow';
import { useCompany } from './presenters/useCompany';
import { ICompanyUserCard } from './types/ICompanyUserCard';
import { getStyles } from './styles';
import { NLTRow } from '@/UIKit/NLTRow';

export const CompanyView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { company, infoRows, userCards, isLoading, onPressBack, onGoToCreateUser } = useCompany();

    const keyExtractor = (item: { id: string }) => item.id;
    const userKeyExtractor = (item: ICompanyUserCard) => String(item.id);

    const renderItem: ListRenderItem<{ id: string; label: string; value: string }> = ({ item }) => {
        return <InfoRow label={t(item.label)} value={item.value.startsWith('company.') ? t(item.value) : item.value} />;
    };

    const renderUserItem: ListRenderItem<ICompanyUserCard> = ({ item }) => {
        return <CompanyUserCard item={item} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.itemSeparator} />;
    };

    const UserSeparatorComponent = () => {
        return <View style={styles.userSeparator} />;
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            scrollEnabled
            contentContainerStyle={styles.container}
            headerComponent={<HeaderWithBackButton title={t('company.detailsTitle')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.title}>{company?.name || t('company.titleFallback')}</Text>
                        <NLTRow label={t('company.owner')} value={company?.contact || ''} />
                        <FlatList
                            data={infoRows}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            scrollEnabled={false}
                            contentContainerStyle={styles.listContent}
                            ItemSeparatorComponent={ItemSeparatorComponent}
                        />
                        <View style={styles.usersHeader}>
                            <Text style={styles.usersTitle}>{t('users.companyUsersTitle')}</Text>
                            <NLTButton text={t('users.addUser')} onPress={onGoToCreateUser} containerStyle={styles.addUserButton} textStyle={styles.addUserButtonText} />
                        </View>
                        <FlatList
                            data={userCards}
                            renderItem={renderUserItem}
                            keyExtractor={userKeyExtractor}
                            scrollEnabled={false}
                            contentContainerStyle={styles.usersListContent}
                            ItemSeparatorComponent={UserSeparatorComponent}
                            ListEmptyComponent={<EmptyListView text={t('users.emptyCompanyUsers')} />}
                        />
                    </View>
                </View>}
        </ScreenContainer>
    );
});
