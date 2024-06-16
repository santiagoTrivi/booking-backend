import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";

export class UpdateNotificationsDto {
  private constructor(
    public notificationsId: string[],
    public notify_to: string
  ) {}

  static create(
    notificationsId: string[],
    notify_to: string
  ): UpdateNotificationsDto {
    return new UpdateNotificationsDto(notificationsId, notify_to);
  }
}
