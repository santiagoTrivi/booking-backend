import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { CreateBookmarkDto } from "../domain/dtos/createBookMark.dto";

export const CreateBlockSchema = Joi.object({
  postBookmarked: Joi.string().required(),
});

export class CreateBlockDtoAdapter extends Adapter<CreateBookmarkDto> {
  adapt(object: RequestExt): CreateBookmarkDto {
    const created_by_user = object.user?.id;
    const result = CreateBlockSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { value } = result;

    return CreateBookmarkDto.create(value.postBookmarked, created_by_user);
  }
}
