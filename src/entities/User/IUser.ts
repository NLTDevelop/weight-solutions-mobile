import type { ICompany } from '@/entities/Company/ICompany';

export interface IUser {
    id: number;
    username: string;
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'user';
    status: 'active' | 'inactive';
    description: string | null;
    company?: ICompany;
}
