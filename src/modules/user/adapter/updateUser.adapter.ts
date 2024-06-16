import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { updateUserDto } from "../domain/dtos/updateDto";

export const UpdateUserSchema = Joi.object<updateUserDto>({
  description: Joi.string().optional(),
  username: Joi.string().optional(),
  isPublic: Joi.boolean().optional(),
  verificado: Joi.boolean().optional(),
});

export class UpdateUserDtoAdapter extends Adapter<updateUserDto> {
  adapt(object: RequestExt): updateUserDto {
    const result = UpdateUserSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);
    return result.value;
  }
}
