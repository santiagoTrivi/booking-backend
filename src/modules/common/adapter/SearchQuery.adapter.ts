import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../schemas/adapter";
import { RequestExt } from "../domain/req-ext";
import { FilterInputQueryDto } from "../domain/filterInputQuery.dto";
import { Request } from "express";

export const SearchQuerySchema = Joi.object<FilterInputQueryDto>({
  page: Joi.number().integer().default(1),
  limit: Joi.number().integer().default(10),
  search: Joi.string().optional(),
  repost: Joi.boolean().optional().default(false),
});

export class SearchQueryDtoAdapter extends Adapter<FilterInputQueryDto> {
  adapt(object: RequestExt | Request): FilterInputQueryDto {
    const result = SearchQuerySchema.validate(object.query, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    return result.value;
  }
}
