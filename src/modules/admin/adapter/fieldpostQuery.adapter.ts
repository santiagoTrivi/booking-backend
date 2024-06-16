import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { STATUS_CONTENT } from "../../common/domain/status.content";
import { PostProps } from "../../post/domain/postProps.interface";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { GetPaginationParamsQuryDto } from "../../common/domain/getPaginationParamsQuery.dto";

export type PostFieldQuery = PostProps & GetPaginationParamsQuryDto;

export const PostPartialfield = Joi.object<PostFieldQuery>({
  caption: Joi.string().optional(),
  status: Joi.string()
    .optional()
    .valid(STATUS_CONTENT.normal, STATUS_CONTENT.sersitive),
  isAvailable: Joi.boolean().optional(),
  reportCount: Joi.number().optional(),
  page: Joi.number().integer().default(1),
  limit: Joi.number().integer().default(10),
});
export class FieldQueryPostDtoAdapter extends Adapter<FieldQuery<PostProps>> {
  adapt(object: RequestExt): FieldQuery<PostProps> {
    const result = PostPartialfield.validate(object.query, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { page, limit, ...partials } = result.value;

    return FieldQuery.create<PostProps>(partials, page, limit);
  }
}
