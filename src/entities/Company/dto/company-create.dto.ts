export interface CompanyCreateDto {
  name: string;
  contact: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}
