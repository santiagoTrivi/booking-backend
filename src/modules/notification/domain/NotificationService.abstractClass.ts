import { CreateNotificationDto } from "./createNotification.dto"


export abstract class NotificationService {
    abstract notify(createNotificationDto: CreateNotificationDto): Promise<any>;
}