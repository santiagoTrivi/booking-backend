import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { createNotificationService } from "./services/createNotification.service";
import { GetNotificationByUserIdService } from "./services";
import { updateNotificationService } from "./services/updateNotification.service";
import { PaginataionQueryDtoAdapter } from "../common/adapter/paginationQuery.adapter";
import { UpdateNotificationsDtoAdapter } from "./adapter/updateNotifications.adapter";
import { FieldQueryNotificationDtoAdapter } from "./adapter/fieldNotificationQuery.adapter";

export class NotificationController {
  private getNotificationByUserIdService = new GetNotificationByUserIdService();

  getNotifications = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { user } = req;
      const userId = user?.id;
      const fieldNotificationQuery =
        new FieldQueryNotificationDtoAdapter().adapt(req);
      const response = await this.getNotificationByUserIdService.run(
        userId,
        fieldNotificationQuery
      );
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  async createNotifications(
    { body }: RequestExt,
    res: Response,
    next: NextFunction
  ) {
    try {
      const responseItem = await createNotificationService(body);
      return res.send(responseItem);
    } catch (error) {
      next(error);
    }
  }

  updateNotification = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updateNotificationsDto = new UpdateNotificationsDtoAdapter().adapt(
        req
      );

      await updateNotificationService(updateNotificationsDto);

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  };
}
