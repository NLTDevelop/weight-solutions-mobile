import { useUiContext } from '@/UIProvider';
import { Typography } from '@/UIKit/Typography';
import { HeaderWithBackButton } from '@/UIKit/HeaderWithBackButton';
import { ScreenContainer } from '@/UIKit/ScreenContainer';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { ProfileMenuItem } from './components/ProfileMenuItem';
import { useProfile } from './presenters/useProfile';
import { getStyles } from './styles';
import { NLTCard } from '@/UIKit/NLTCard';
import { BellIcon } from '@/assets/icons/BellIcon';
import { LogoutIcon } from '@/assets/icons/LogoutIcon';
import { TrashIcon } from '@/assets/icons/TrashIcon';
import { UserIcon } from '@/assets/icons/UserIcon';
import { EditIcon } from '@/assets/icons/EditIcon';
import { NLTModal } from '@/UIKit/NLTModal';
import { userModel } from '@/entities/User/UserModel';
import { OnePlatformIcon } from '@/assets/icons/OnePlatformIcon';


export const ProfileView = observer(() => {
    const { colors, t } = useUiContext();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { isExitModalVisible, isDeleteModalVisible, isNotificationsEnabled, onLogout, onCloseModal, onDeleteAccount, onGoToPersonalData, onGoToContactInformation, onGoToChangePassword, onOpenLogoutModal,
        onToggleNotifications, onOpenDeleteModal, } = useProfile();
    const isSuperadmin = userModel.user?.role === 'superadmin';

    return (
        <ScreenContainer edges={['top']} headerComponent={<HeaderWithBackButton backDisabled title={t('profile.title')} />}>
            <View style={styles.content}>
                <NLTCard>
                    <Typography variant='h2' text={userModel.user?.name} />
                    <Typography variant='body_m' text={t(`profile.roles.${userModel.user?.role}`)} style={styles.role} />
                </NLTCard>
                <NLTCard >
                    <Typography variant='h3' text={t('profile.settingsTitle')} style={styles.name} />
                    <ProfileMenuItem icon={<UserIcon color={colors.icon_strong} />} title={t('profile.personalDataTitle')} onPress={onGoToPersonalData} />
                    <View style={styles.itemSeparator} />
                    <ProfileMenuItem icon={<BellIcon color={colors.icon_strong} />} title={t('profile.notificationsTitle')} onPress={onToggleNotifications} trailingType={'toggle'} toggleValue={isNotificationsEnabled} onToggle={onToggleNotifications} />
                    <View style={styles.itemSeparator} />
                    <ProfileMenuItem icon={<EditIcon color={colors.icon_strong} />} title={t('profile.changePasswordTitle')} onPress={onGoToChangePassword} />
                    {isSuperadmin ? <View style={styles.itemSeparator} /> : null}
                    {isSuperadmin ? <ProfileMenuItem icon={<EditIcon color={colors.icon_strong} />} title={t('profile.contactSettingsTitle')} onPress={onGoToContactInformation} /> : null}
                    <View style={styles.itemSeparator} />
                    <ProfileMenuItem icon={<LogoutIcon color={colors.icon_strong} />} title={t('profile.logoutTitle')} onPress={onOpenLogoutModal} />
                    <View style={styles.itemSeparator} />
                    <ProfileMenuItem icon={<TrashIcon />} title={t('profile.deleteAccountTitle')} onPress={onOpenDeleteModal} />
                </NLTCard>

                <NLTCard containerStyle={styles.footerCard}>
                    <View style={styles.footer}>
                        <OnePlatformIcon />
                        <View style={styles.row}>
                            <Typography variant='body_s' text={t('profile.developedBy')} style={styles.footerText} />
                            <Typography variant='body_l_bold' text={t('profile.onePlatform')} style={[styles.footerText, { color: colors.text }]} />
                        </View>
                    </View>
                </NLTCard>
            </View>

            <NLTModal
                isVisible={isExitModalVisible}
                title={t('profile.logoutModalTitle')}
                description={t('profile.logoutModalDescription')}
                confirmText={t('profile.logoutConfirm')}
                cancelText={t('profile.cancel')}
                onConfirm={onLogout}
                onCancel={onCloseModal}
            />
            <NLTModal
                isVisible={isDeleteModalVisible}
                title={t('profile.deleteModalTitle')}
                description={t('profile.deleteModalDescription')}
                confirmText={t('profile.deleteConfirm')}
                cancelText={t('profile.cancel')}
                onConfirm={onDeleteAccount}
                onCancel={onCloseModal}
                isDestructive={true}
            />
        </ScreenContainer>
    );
});
