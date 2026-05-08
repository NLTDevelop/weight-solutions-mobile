import { useUiContext } from '@/UIProvider';
import { CompanyIcon } from '@/assets/icons/CompanyIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { PlusIcon } from '@/assets/icons/PlusIcon';
import { NLTButton } from '@/UIKit/NLTButton';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { Loader } from '@/UIKit/Loader';
import { EmptyListView } from '@/UIKit/NLTEmptyListView';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { NLTTabView } from '@/UIKit/NLTTabView';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CompanyUserCard } from './components/CompanyUserCard';
import { InfoRow } from './components/InfoRow';
import { useCompany } from './presenters/useCompany';
import { ICompanyUserCard } from './types/ICompanyUserCard';
import { getStyles } from './styles';

type TRoute = {
    key: string;
    title: string;
};

export const CompanyView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { company, infoRows, userCards, isLoading, onPressBack, onGoToCreateUser, onPressEditCompany } = useCompany();

    const routes = useMemo<TRoute[]>(() => [
        { key: 'info', title: t('company.tabs.info') },
        { key: 'users', title: t('company.tabs.users') },
    ], [t]);

    const renderInfoScene = () => (
        <View style={styles.scene}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <CompanyIcon />
                        <Text style={styles.cardTitle}>{company?.name || t('company.titleFallback')}</Text>
                    </View>
                    {infoRows.map((item, index) => (
                        <View key={item.id}>
                            {index > 0 ? <View style={styles.separator} /> : null}
                            <InfoRow label={item.label} value={item.value} />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <NLTButton
                    text={t('company.editButton')}
                    onPress={onPressEditCompany}
                    containerStyle={styles.footerButton}
                    textStyle={styles.footerButtonText}
                    LeftAccessory={<EditIcon color={colors.icon_strong} />}
                />
            </View>
        </View>
    );

    const renderUsersScene = () => (
        <View style={styles.scene}>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.usersHeading}>
                    <CompanyIcon />
                    <Text style={styles.usersHeadingText}>{t('users.companyUsersTitle')}</Text>
                </View>
                <View style={styles.usersList}>
                    {userCards.map((item: ICompanyUserCard) => (
                        <CompanyUserCard key={item.id} item={item} />
                    ))}
                    {!userCards.length ? (
                        <View style={styles.emptyState}>
                            <EmptyListView text={t('users.emptyCompanyUsers')} />
                        </View>
                    ) : null}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <NLTButton
                    text={t('users.addUser')}
                    onPress={onGoToCreateUser}
                    containerStyle={styles.footerButton}
                    textStyle={styles.footerButtonText}
                    LeftAccessory={<PlusIcon color={colors.icon_strong} />}
                />
            </View>
        </View>
    );

    const renderScene = ({ route }: { route: TRoute; }) => {
        if (route.key === 'users') {
            return renderUsersScene();
        }

        return renderInfoScene();
    };

    return (
        <ScreenContainer
            edges={['top', 'bottom']}
            containerStyle={styles.screen}
            headerComponent={<HeaderWithBackButton title={company?.name || t('company.titleFallback')} onPressBack={onPressBack} containerStyle={styles.header} />}
        >
            {isLoading
                ? <Loader />
                : <View style={styles.content}>
                    <NLTTabView
                        routes={routes}
                        renderScene={renderScene}
                        tabBarStyle={styles.tabBar}
                        indicatorStyle={styles.tabIndicator}
                        labelStyle={styles.tabLabel}
                        activeColor={colors.text_strong}
                        inactiveColor={colors.text_middle}
                        sceneContainerStyle={styles.sceneContainer}
                    />
                </View>}
        </ScreenContainer>
    );
});
