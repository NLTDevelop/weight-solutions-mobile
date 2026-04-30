export interface UserUpdateDto {
    name?: string | null;
    password?: string | null;
    email?: string | null;
    username?: string | null;
    company_id?: number | null;
    description?: string | null;
    active?: boolean | null;
}
