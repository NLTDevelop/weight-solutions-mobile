import { MovementType, WeightType } from "../types";

export interface OrderWeightItemDto {
    weight: string;
    weight_type: WeightType;
    is_correction: 'true' | 'false';
}

export interface OrderCreateDto {
    car_phone: string;
    car_number: string;
    product_id: number;
    type: MovementType;
    weight_count: number;
    is_guest: 'true' | 'false';
    comment?: string;
    item: OrderWeightItemDto;
}
