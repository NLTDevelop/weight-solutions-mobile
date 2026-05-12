import { useUiContext } from '@/UIProvider';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { CompanyUserCard } from '@/modules/Companies/Company/components/CompanyUserCard';
import { ICompanyUserCard } from '@/modules/Companies/Company/types/ICompanyUserCard';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useUsersManagement } from './presenters/useUsersManagement';
import { getStyles } from './styles';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';

export const UsersManagementView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { userCards, isLoading, onPressCreateUser } = useUsersManagement();

    const keyExtractor = (item: ICompanyUserCard) => String(item.id);

    const renderItem = ({ item }: { item: ICompanyUserCard }) => {
        return <CompanyUserCard item={item} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} headerComponent={<HeaderWithBackButton title={t('users.managementTitle')} />} >
            <FlatList
                data={userCards}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={<EmptyListView description={t('users.managementEmptyDescription')} text={t('users.managementEmptyTitle')} isLoading={isLoading} />}
                refreshing={isLoading}
                style={styles.list}
                contentContainerStyle={styles.contentContainerStyle}
            />
            <View style={styles.footer}>
                <NLTButton
                    text={t('users.addUser')}
                    onPress={onPressCreateUser}
                    containerStyle={styles.footerButton}
                    textStyle={styles.footerButtonText}
                    LeftAccessory={<PlusIcon color={colors.icon_strong} />}
                />
            </View>
        </ScreenContainer>
    );
});
