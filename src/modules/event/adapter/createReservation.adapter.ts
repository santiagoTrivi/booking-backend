import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { SERVICE_TYPE } from "../../common/domain/services.type";
import { CreateReservationDto } from "../domain/createReservation.dto";

export const createReservationSchema = Joi.object({
  setDate: Joi.date().required(),
  hour: Joi.number().required(),
});

export class CreateReservationDtoAdapter extends Adapter<CreateReservationDto> {
  adapt(object: RequestExt): CreateReservationDto {
    const created_by = object.user?.id;
    const result = createReservationSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { value } = result;
    return CreateReservationDto.create(value.setDate, created_by, value.hour);
  }
}
