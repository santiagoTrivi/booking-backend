import { Request } from "express";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RefreshTokenDto } from "../domain/dtos/refreshToken.dto";
import Joi from "joi";
import { RequestExt } from "../../common/domain/req-ext";

export const ReschTokenSchema = Joi.object<RefreshTokenDto>({
  refreshToken: Joi.string().required().min(10),
});

export class RefreshTokenAdapter implements Adapter<RefreshTokenDto> {
  adapt(object: RequestExt): RefreshTokenDto {
    const result = ReschTokenSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
