import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { GetPaginationParamsQuryDto } from "../../common/domain/getPaginationParamsQuery.dto";
import { notificationProps } from "../domain/notificationProps.interface";

export type NotificationFieldQuery = notificationProps &
  GetPaginationParamsQuryDto;

export const NotificationPartialfieldSchema =
  Joi.object<NotificationFieldQuery>({
    isRead: Joi.boolean().optional(),
    page: Joi.number().integer().default(1),
    limit: Joi.number().integer().default(10),
  });
export class FieldQueryNotificationDtoAdapter extends Adapter<
  FieldQuery<notificationProps>
> {
  adapt(object: RequestExt): FieldQuery<notificationProps> {
    const result = NotificationPartialfieldSchema.validate(object.query, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { page, limit, ...partials } = result.value;

    return FieldQuery.create<notificationProps>(partials, page, limit);
  }
}
