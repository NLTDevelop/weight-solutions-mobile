import type { IProduct } from '@/entities/Product/IProduct';
import type { IUser } from '@/entities/User/IUser';
import type { ICompany } from '@/entities/Company/ICompany';

export interface IOrderItem {
    id: number;
    weight: string;
    weight_type: string;
    created_at?: string | null;
}

export interface IOrder {
    id: number;
    localId?: number | null;
    car_phone?: string | null;
    car_number: string;
    created_at: string;
    user?: IUser | null;
    product?: IProduct | null;
    company?: ICompany | null;
    type?: string | null;
    weight_count?: number | null;
    is_guest?: boolean | null;
    items?: IOrderItem[] | null;
    status?: string | null;
    comment?: string | null;
    updated_at?: string | null;
    isSyncedWithServer?: boolean;
    pendingSyncAction?: 'create' | 'addItem' | null;
    pendingItemsToSync?: IOrderItem[] | null;
}
