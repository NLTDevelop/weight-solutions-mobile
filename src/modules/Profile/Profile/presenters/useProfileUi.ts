import { IProfileMenuItem } from '@/modules/Profile/types/IProfileMenuItem';

interface IProps {
    userName: string;
    roleText: string;
    onGoToPersonalData: () => void;
    onGoToLinkedObjects: () => void;
    onOpenLogoutModal: () => void;
    onOpenDeleteModal: () => void;
    confirmationType: 'logout' | 'delete' | null;
}

export const useProfileUi = ({
    userName,
    roleText,
    onGoToPersonalData,
    onGoToLinkedObjects,
    onOpenLogoutModal,
    onOpenDeleteModal,
    confirmationType,
}: IProps) => {
    const mainMenuItems: IProfileMenuItem[] = [
        {
            id: 'personal-data',
            title: 'profile.personalDataTitle',
            onPress: onGoToPersonalData,
        },
        {
            id: 'linked-objects',
            title: 'profile.linkedObjectsTitle',
            onPress: onGoToLinkedObjects,
        },
    ];

    const accountMenuItems: IProfileMenuItem[] = [
        {
            id: 'logout',
            title: 'profile.logoutTitle',
            onPress: onOpenLogoutModal,
        },
        {
            id: 'delete',
            title: 'profile.deleteAccountTitle',
            onPress: onOpenDeleteModal,
            isDestructive: true,
        },
    ];

    const confirmationTitle = confirmationType === 'delete' ? 'profile.deleteModalTitle' : 'profile.logoutModalTitle';
    const confirmationDescription = confirmationType === 'delete' ? 'profile.deleteModalDescription' : 'profile.logoutModalDescription';
    const confirmationButtonText = confirmationType === 'delete' ? 'profile.deleteConfirm' : 'profile.logoutConfirm';

    return {
        userName,
        roleText,
        mainMenuItems,
        accountMenuItems,
        confirmationTitle,
        confirmationDescription,
        confirmationButtonText,
    };
};
