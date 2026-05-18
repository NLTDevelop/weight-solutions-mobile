export interface NotificationListDto {
    type: 'all' | 'unread';
    limit: number;
    offset: number;
}
