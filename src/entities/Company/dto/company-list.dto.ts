export interface CompanyListDto {
    limit: number;
    offset: number;
    status: 'active' | 'inactive';
    name?: string;
}
