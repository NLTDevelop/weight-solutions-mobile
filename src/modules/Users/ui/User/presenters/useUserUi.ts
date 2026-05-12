import { IUser } from '@/entities/User/IUser';
import { getProfileRoleTextKey } from '@/modules/Profile/presenters/getProfileRoleTextKey';

interface IUserInfoRow {
    id: string;
    label: string;
    value: string;
}

interface IProps {
    user: IUser | null;
}

export const useUserUi = ({ user }: IProps) => {
    const infoRows: IUserInfoRow[] = [
        {
            id: 'phone',
            label: 'users.phone',
            value: user?.contact?.phone || 'users.phoneFallback',
        },
        {
            id: 'username',
            label: 'users.username',
            value: user?.username || '-',
        },
        {
            id: 'email',
            label: 'users.email',
            value: user?.email || '-',
        },
        {
            id: 'role',
            label: 'users.role',
            value: getProfileRoleTextKey(user?.role),
        },
        {
            id: 'status',
            label: 'users.status',
            value: user?.status === 'active' ? 'products.statuses.active' : 'products.statuses.inactive',
        },
        {
            id: 'description',
            label: 'users.description',
            value: user?.description || '-',
        },
        {
            id: 'company',
            label: 'users.company',
            value: user?.company?.name || '-',
        },
    ];

    return {
        infoRows,
    };
};
