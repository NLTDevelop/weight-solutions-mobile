export interface UserCreateDto {
    name: string;
    role?: 'admin' | 'user';
    password: string;
    description?: string | null;
    email: string;
    username: string;
    company_id: number;
}
