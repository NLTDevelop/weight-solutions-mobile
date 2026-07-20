export interface IProduct {
    id: number;
    name: string;
    description: string | null;
    active: 'active' | 'inactive';
}
