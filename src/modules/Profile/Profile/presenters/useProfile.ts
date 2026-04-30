import { companyModel } from '@/entities/Company/CompanyModel';
import { userModel } from '@/entities/User/UserModel';
import { usersModel } from '@/entities/Users/UsersModel';
import { usersService } from '@/entities/Users/UsersService';
import { toastService } from '@/libs/toast/toastService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useProfileUi } from './useProfileUi';

export const useProfile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [confirmationType, setConfirmationType] = useState<'logout' | 'delete' | null>(null);

    const onGoToPersonalData = () => {
        navigation.navigate('PersonalDataView');
    };

    const onGoToLinkedObjects = () => {
        navigation.navigate('LinkedObjectsView');
    };

    const onOpenLogoutModal = () => {
        setConfirmationType('logout');
    };

    const onOpenDeleteModal = () => {
        setConfirmationType('delete');
    };

    const onCloseModal = () => {
        setConfirmationType(null);
    };

    const onResetSession = () => {
        userModel.clear();
        usersModel.clear();
        companyModel.company = null;
        companyModel.companies = [];
        companyModel.meta = null;
        navigation.reset({ index: 0, routes: [{ name: 'AuthorizationView' }] });
    };

    const onConfirmAction = async () => {
        if (confirmationType === 'logout') {
            onCloseModal();
            onResetSession();
            return;
        }

        const currentUserId = userModel.user?.id;

        if (!currentUserId) {
            toastService.showError('Profile action failed', 'User is not available');
            onCloseModal();
            return;
        }

        const response = await usersService.delete(currentUserId);
        onCloseModal();

        if (response.isError) {
            toastService.showError('Delete failed', response.message || 'Please try again');
            return;
        }

        onResetSession();
    };

    const profileUi = useProfileUi({
        userName: userModel.user?.name || '-',
        roleText: userModel.user?.role || '-',
        onGoToPersonalData,
        onGoToLinkedObjects,
        onOpenLogoutModal,
        onOpenDeleteModal,
        confirmationType,
    });

    return {
        isConfirmationVisible: confirmationType !== null,
        confirmationType,
        onCloseModal,
        onConfirmAction,
        ...profileUi,
    };
};
