import { userModel } from '@/entities/User/UserModel';
import { contactInformationModel } from '@/entities/ContactInformation/ContactInformationModel';
import { getProfileRoleTextKey } from '../../presenters/getProfileRoleTextKey';

export const usePersonalDataUi = () => {
    const rows = [
        { id: 'name', label: 'profile.personalName', value: userModel.user?.name || '-' },
        { id: 'role', label: 'profile.personalRole', value: getProfileRoleTextKey(userModel.user?.role) },
        { id: 'phone', label: 'profile.personalPhone', value: contactInformationModel.contactInformation?.phone || userModel.user?.contact?.phone || '-' },
        { id: 'email', label: 'profile.personalEmail', value: userModel.user?.email || '-' },
    ];

    return {
        rows,
    };
};
