import { NotificationEnum, NotificationType } from "./notificationType";

export interface notificationProps {
  notify_by?: any;
  notify_to: any;
  notifiedAt: Date;
  type: string;
  amount?: Number;
  post?: any;
  group?: any;
  comment?: any;
  isRead: boolean;
  message?: string;
}
