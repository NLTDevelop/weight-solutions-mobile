import { companyModel } from '@/entities/Company/CompanyModel';
import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { userModel } from '@/entities/User/UserModel';
import { usersModel } from '@/entities/Users/UsersModel';
import { usersService } from '@/entities/Users/UsersService';
import { toastService } from '@/libs/toast/toastService';
import { useUiContext } from '@/UIProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Linking } from 'react-native';

export const useProfile = () => {
    const { t } = useUiContext();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [confirmationType, setConfirmationType] = useState<'logout' | 'delete' | null>(null);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const isExitModalVisible = confirmationType === 'logout';
    const isDeleteModalVisible = confirmationType === 'delete';

    const onGoToPersonalData = () => {
        navigation.navigate('PersonalDataView');
    };

    const onGoToContactInformation = () => {
        navigation.navigate('ContactInformationView');
    };

    const onGoToChangePassword = () => {
        navigation.navigate('ChangePasswordView');
    };

    const onGoToUsersManagement = () => {
        navigation.navigate('UsersManagementView');
    };

    const onOpenLogoutModal = () => {
        setConfirmationType('logout');
    };

    const onOpenDeleteModal = () => {
        setConfirmationType('delete');
    };

    const onToggleNotifications = () => {
        setIsNotificationsEnabled(previousValue => !previousValue);
    };

    const onCloseModal = () => {
        setConfirmationType(null);
    };

    const onLogout = () => {
        onCloseModal();
        userModel.clear();
        usersModel.clear();
        companyModel.clear();
        contactInformationModel.clear();
        navigation.reset({ index: 0, routes: [{ name: 'AuthorizationView' }] });
    };

    const onDeleteAccount = async () => {
        const currentUserId = userModel.user?.id;

        if (!currentUserId) {
            toastService.showError(t('profile.actionFailed'), t('profile.userNotAvailable'));
            onCloseModal();
            return;
        }

        const response = await usersService.delete(currentUserId);
        onCloseModal();
        if (response.isError) {
            toastService.showError(t('profile.deletefailed'), response.message || t('profile.tryAgainPlease'));
            return;
        }
        onLogout();
    };

    const onGoToOnePlatform = () => {
        Linking.openURL('https://oneplatform.club/uk')
    }

    return {
        isExitModalVisible,
        isDeleteModalVisible,
        isNotificationsEnabled,
        onLogout,
        onCloseModal,
        onDeleteAccount,
        onGoToPersonalData,
        onGoToContactInformation,
        onGoToChangePassword,
        onGoToUsersManagement,
        onOpenLogoutModal,
        onToggleNotifications,
        onOpenDeleteModal,
        onGoToOnePlatform,
    };
};
