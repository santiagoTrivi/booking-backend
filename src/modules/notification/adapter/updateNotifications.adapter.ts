import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { UpdateNotificationsDto } from "../domain/updateNotifications.dto";

export const UpdateNotificationSchema = Joi.object<
  Pick<UpdateNotificationsDto, "notificationsId">
>({
  notificationsId: Joi.array().required().items(Joi.string().required()), // Ensure each item in the array is a string
});

export class UpdateNotificationsDtoAdapter extends Adapter<UpdateNotificationsDto> {
  adapt(object: RequestExt): UpdateNotificationsDto {
    const notify_to = object.user?.id;
    const result = UpdateNotificationSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return UpdateNotificationsDto.create(
      result.value.notificationsId,
      notify_to
    );
  }
}
