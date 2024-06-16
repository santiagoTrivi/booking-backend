import { CreateNotificationDto } from "./createNotification.dto";

export interface NotificationServiceCommand<T> {
    notify(createNotificationDto: CreateNotificationDto): Promise<any>;
}

