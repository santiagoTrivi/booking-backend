import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { Request } from "express";
import { LoginDto } from "../domain/dtos/login.dto";

export const RegisterUserSchema = Joi.object<LoginDto>({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

export class LoginDtoAdapter extends Adapter<LoginDto> {
  adapt(object: Request): LoginDto {
    const result = RegisterUserSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
