export interface UserListDto {
    limit: number;
    offset: number;
    status: 'active' | 'inactive';
}
