import Joi from "joi";
import { GetPaginationParamsQuryDto } from "../domain/getPaginationParamsQuery.dto";
import { Adapter, errorJoiAdapter } from "../schemas/adapter";
import { RequestExt } from "../domain/req-ext";
import { Request } from "express";

export const PaginationQuerySchema = Joi.object<GetPaginationParamsQuryDto>({
  page: Joi.number().integer().default(1),
  limit: Joi.number().integer().default(10),
});

export class PaginataionQueryDtoAdapter extends Adapter<GetPaginationParamsQuryDto> {
  adapt(object: RequestExt | Request): GetPaginationParamsQuryDto {
    const result = PaginationQuerySchema.validate(object.query, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
