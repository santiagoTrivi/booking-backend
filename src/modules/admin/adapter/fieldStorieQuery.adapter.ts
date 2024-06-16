import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { STATUS_CONTENT } from "../../common/domain/status.content";
import { PostProps } from "../../post/domain/postProps.interface";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { GetPaginationParamsQuryDto } from "../../common/domain/getPaginationParamsQuery.dto";
import { StorieProps } from "../../storie/domain/storiesProps.interface";

export type StorieFieldQuery = StorieProps & GetPaginationParamsQuryDto;

export const PostPartialfield = Joi.object<StorieFieldQuery>({
  status: Joi.string()
    .optional()
    .valid(STATUS_CONTENT.normal, STATUS_CONTENT.sersitive),
  isAvailable: Joi.boolean().optional(),
  reportCount: Joi.number().optional(),
  page: Joi.number().integer().default(1),
  limit: Joi.number().integer().default(10),
});
export class FieldQueryStorieDtoAdapter extends Adapter<
  FieldQuery<StorieProps>
> {
  adapt(object: RequestExt): FieldQuery<StorieProps> {
    const result = PostPartialfield.validate(object.query, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { page, limit, ...partials } = result.value;

    return FieldQuery.create<StorieProps>(partials, page, limit);
  }
}
