import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RegisterUserDto } from "../domain/dtos/registerUser.dto";
import { Request } from "express";

export const RegisterUserSchema = Joi.object<RegisterUserDto>({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export class RegisterUserAdapter extends Adapter<RegisterUserDto> {
  adapt(object: Request): RegisterUserDto {
    const result = RegisterUserSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
