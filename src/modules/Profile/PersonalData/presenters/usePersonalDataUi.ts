import { userModel } from '@/entities/User/UserModel';

export const usePersonalDataUi = () => {
    const rows = [
        { id: 'name', label: 'profile.personalName', value: userModel.user?.name || '-' },
        { id: 'role', label: 'profile.personalRole', value: userModel.user?.role || '-' },
        { id: 'email', label: 'profile.personalEmail', value: userModel.user?.email || '-' },
        { id: 'username', label: 'profile.personalUsername', value: userModel.user?.username || '-' },
        { id: 'company', label: 'profile.personalCompany', value: userModel.user?.company?.name || '-' },
    ];

    return {
        rows,
    };
};
