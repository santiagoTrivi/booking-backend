import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { User } from "../../user/model/user.model";
import { CreateNotificationDto } from "../domain/createNotification.dto";
import { notificationProps } from "../domain/notificationProps.interface";
import Notification from "../model/notification.model";

export const createNotificationService = async (
  notificationData: notificationProps
) => {
  return await Notification.create(notificationData);
};
