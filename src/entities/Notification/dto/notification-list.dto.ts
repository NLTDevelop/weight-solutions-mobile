import { NotificationStatusEnum } from '../enums/NotificationStatusEnum';

export interface NotificationListDto {
    type: NotificationStatusEnum;
    limit: number;
    offset: number;
}
