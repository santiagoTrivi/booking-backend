import { FollowMongooseType } from "../../follow/model/follow.model";
import { UserMongooseType } from "../../user/model/user.model";
import { CreateNotificationDto } from "../domain/createNotification.dto";
import { NotificationServiceCommand } from "../domain/notificationServiceCommand.interface";
import { NotificationEnum } from "../domain/notificationType";
import Notification from "../model/notification.model";



export class NotificationMongodbServiceCommand implements NotificationServiceCommand<FollowMongooseType>{

    notify = async (createNotificationDto: CreateNotificationDto): Promise<any> => {

        const { type } = createNotificationDto;

        const foundNotification = await Notification.findOne({...createNotificationDto});

        if(!foundNotification || type === NotificationEnum.TRANFERENCE || type === NotificationEnum.DEPOSIT){
            return await Notification.create({notifiedAt: new Date(), ...createNotificationDto});
        }

    }    
}
