import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RegisterUserDto } from "../domain/dtos/registerUser.dto";
import { Request } from "express";
import { CreateUserwithPhoneDto } from "../domain/dtos/createUserWithPhone.dtp";

export const RegisterUserSchema = Joi.object<CreateUserwithPhoneDto>({
  username: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required().min(6),
  category: Joi.string().required(),
});

export class CreateUserWithPhoneAdapter extends Adapter<CreateUserwithPhoneDto> {
  adapt(object: Request): CreateUserwithPhoneDto {
    const result = RegisterUserSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
