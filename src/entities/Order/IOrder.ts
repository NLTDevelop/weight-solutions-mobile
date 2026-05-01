import type { IProduct } from '@/entities/Product/IProduct';
import type { IUser } from '@/entities/User/IUser';

export interface IOrder {
    id: number;
    car_number: string;
    weight_before: string;
    weight_after: string;
    created_at: string;
    user?: IUser | null;
    product?: IProduct | null;
    type?: string | null;
    status?: string | null;
    comment?: string | null;
    suspicious?: boolean | null;
    updated_at?: string | null;
    first_weight_at?: string | null;
    second_weight_at?: string | null;
}
