import { IUser } from '@/entities/User/IUser';

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
            value: user?.role || '-',
        },
        {
            id: 'status',
            label: 'users.status',
            value: user?.status || '-',
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
