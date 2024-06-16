import { getUserFollowers } from "../../follow/services";
import { NotificationService } from "../domain/NotificationService.abstractClass";
import { CreateNotificationDto } from "../domain/createNotification.dto";
import { NotificationEnum } from "../domain/notificationType";

import { NotificationMongodbServiceCommand } from "./notificationMongodbService.command";



export class AppNotificationMongodbService extends NotificationService{
    
    private readonly notificationMongodbServiceCommand = new NotificationMongodbServiceCommand();

    notify = async (createNotificationDto: CreateNotificationDto): Promise<any> => {
       return await this.notificationMongodbServiceCommand.notify(createNotificationDto);
    }
  
}
