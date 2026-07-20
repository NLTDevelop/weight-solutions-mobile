export interface CompanyUpdateDto {
  name: string;
  contact: string;
  description?: string | null;
  status?: 'active' | 'inactive' | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}
