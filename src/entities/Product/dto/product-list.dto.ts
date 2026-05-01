export interface ProductListDto {
    limit: number;
    offset: number;
    status: 'active' | 'inactive' | 'archive';
}
