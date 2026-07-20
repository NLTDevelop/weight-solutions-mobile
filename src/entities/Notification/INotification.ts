export interface INotification {
    id: string;
    icon: string;
    title: 'Новий етап зважування' | 'Нове зважування' | 'Статус зважування змінено';
    content: string;
    read_at?: string | null;
    created_at: string;
    data?: {
        number?: number;
    } | null;
}
