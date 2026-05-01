export interface ProductUpdateDto {
    name: string;
    description: string | null;
    status: 'active' | 'inactive';
}
