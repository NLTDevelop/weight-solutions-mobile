import type { ICompany } from '@/entities/Company/ICompany';
import type { IContactInformation } from '@/entities/ContactInformation/IContactInformation';

export interface IUser {
    id: number;
    username: string;
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'user';
    status: 'active' | 'inactive';
    description: string | null;
    company?: ICompany;
    contact?: IContactInformation | null;
}
