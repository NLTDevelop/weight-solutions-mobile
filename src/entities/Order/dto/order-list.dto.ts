import { OrderListDtoStatusEnum } from "../enums/OrderListDtoStatusEnum";

export interface OrderListDto {
    limit: number;
    offset: number;
    status?: OrderListDtoStatusEnum;
    car_number?: string | null;
}
