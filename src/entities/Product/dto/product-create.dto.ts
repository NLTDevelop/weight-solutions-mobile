export interface ProductCreateDto {
    name: string;
    description: string | null;
    status?: 'active' | 'inactive' | null;
}
