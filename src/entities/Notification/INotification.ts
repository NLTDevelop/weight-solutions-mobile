export interface INotification {
    id: string;
    icon: string;
    title: 'Новий етап зважування' | 'Нове зважування' | 'Статус зважування змінено';
    content: string;
    read_at?: string;
    created_at: string;
    data: string;
}
