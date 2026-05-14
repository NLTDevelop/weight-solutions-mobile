export interface OrderListDto {
    limit: number;
    offset: number;
    status?: string | null;
    car_number?: string | null;
}
