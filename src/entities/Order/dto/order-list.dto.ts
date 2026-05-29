import { OrderListDtoStatusEnum } from "../enums/OrderListDtoStatusEnum";

export interface OrderListDto {
    limit: number;
    offset: number;
    is_guest: boolean;
    status: OrderListDtoStatusEnum;
    car_number?: string | null;
}
