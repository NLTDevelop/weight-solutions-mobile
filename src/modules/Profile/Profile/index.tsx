import { useUiContext } from '@/UIProvider';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { FlatList, ListRenderItem, View, Text } from 'react-native';
import { ProfileConfirmationModal } from './components/ProfileConfirmationModal';
import { ProfileMenuItem } from './components/ProfileMenuItem';
import { useProfile } from './presenters/useProfile';
import { getStyles } from './styles';
import { IProfileMenuItem } from '../types/IProfileMenuItem';

export const ProfileView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const {
        userName,
        roleText,
        mainMenuItems,
        accountMenuItems,
        confirmationTitle,
        confirmationDescription,
        confirmationButtonText,
        confirmationType,
        isConfirmationVisible,
        onCloseModal,
        onConfirmAction,
    } = useProfile();

    const keyExtractor = (item: IProfileMenuItem) => item.id;

    const renderItem: ListRenderItem<IProfileMenuItem> = ({ item }) => {
        return <ProfileMenuItem item={{ ...item, title: t(item.title), subtitle: item.subtitle ? t(item.subtitle) : undefined }} />;
    };

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator} />;
    };

    return (
        <ScreenContainer edges={['top', 'bottom']} contentContainerStyle={styles.container} headerComponent={<HeaderWithBackButton backDisabled title={t('profile.title')} containerStyle={styles.header} />}>
            <View style={styles.summaryCard}>
                <Text style={styles.name}>{userName}</Text>
                <Text style={styles.role}>{roleText}</Text>
            </View>

            <FlatList
                data={mainMenuItems}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />

            <FlatList
                data={accountMenuItems}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                scrollEnabled={false}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            />

            <ProfileConfirmationModal
                isVisible={isConfirmationVisible}
                title={t(confirmationTitle)}
                description={t(confirmationDescription)}
                confirmText={t(confirmationButtonText)}
                cancelText={t('profile.cancel')}
                onConfirm={onConfirmAction}
                onCancel={onCloseModal}
                isDestructive={confirmationType === 'delete'}
            />
        </ScreenContainer>
    );
});
