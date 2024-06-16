import { notificationProps } from "./notificationProps.interface";
import { NotificationEnum, NotificationType } from "./notificationType";

interface UsersNotification {
    notify_by?: any;
    notify_to: any;
    notifiedAt: Date;
    type: string
    amount?: Number;
    post?: any;
    group?:any;
    comment?: any;
    isRead: boolean;
}


export type CreateNotificationDto = Omit<UsersNotification, 'notifiedAt' | 'isRead'>;