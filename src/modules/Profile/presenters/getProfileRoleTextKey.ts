export const getProfileRoleTextKey = (role?: string | null) => {
    if (role === 'superadmin') {
        return 'profile.roles.superadmin';
    }

    if (role === 'admin') {
        return 'profile.roles.admin';
    }

    if (role === 'user') {
        return 'profile.roles.user';
    }

    return 'profile.roles.unknown';
};
