import { IUser } from '../User/IUser';

export interface ICompany {
    id: number;
    name: string;
    contact: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    status: 'active' | 'inactive';
    users?: IUser[];
}
