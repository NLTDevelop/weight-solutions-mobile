export interface UserCreateDto {
    name: string;
    password: string;
    description?: string | null;
    email: string;
    username: string;
    company_id: number;
}
