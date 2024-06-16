import { UpdateNotificationsDto } from "../domain/updateNotifications.dto";
import Notification from "../model/notification.model"


export const updateNotificationService = async (updateNotificationsDto: UpdateNotificationsDto) => {

    const { notificationsId, notify_to } = updateNotificationsDto;

    await Notification.updateMany({_id: notificationsId, notify_to }, {$set: {isRead: true}});
}