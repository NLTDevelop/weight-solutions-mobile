import { OrderListDtoStatusEnum } from "../enums/OrderListDtoStatusEnum";
import { MovementType } from "../types";

export interface OrderListDto {
    limit: number;
    offset: number;
    is_guest: 'true' | 'false';
    status: OrderListDtoStatusEnum;
    car_number?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    type?: MovementType | null;
}
