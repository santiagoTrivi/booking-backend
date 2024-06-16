import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { UpdateUserPasswordDto } from "../domain/dtos/updateUserPassword.dto";

export const UpdateUserPasswordSchema = Joi.object<UpdateUserPasswordDto>({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

export class UpdateUserPasswordDtoAdapter extends Adapter<UpdateUserPasswordDto> {
  adapt(object: RequestExt): UpdateUserPasswordDto {
    const result = UpdateUserPasswordSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);
    return result.value;
  }
}
