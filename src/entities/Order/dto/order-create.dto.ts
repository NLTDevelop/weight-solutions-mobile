export interface OrderWeightItemDto {
    weight: string;
    weight_type: string;
}

export interface OrderCreateDto {
    car_phone: string;
    car_number: string;
    product_id: number;
    type: string;
    weight_count: number;
    is_guest: boolean;
    comment?: string;
    item: OrderWeightItemDto;
}
