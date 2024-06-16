import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { STATUS_CONTENT } from "../../common/domain/status.content";
import {
  UpdatePostAdmin,
  UpdatePostAdminDto,
} from "../domain/dtos/updatepostAdmin.dto";

export const UpdatePostAdminSchema = Joi.object<Partial<UpdatePostAdmin>>({
  status: Joi.string()
    .optional()
    .valid(STATUS_CONTENT.normal, STATUS_CONTENT.sersitive),
  isAvailable: Joi.boolean().optional(),
});

export class UpdatePostAdminDtoAdapter extends Adapter<UpdatePostAdminDto> {
  adapt(object: RequestExt): UpdatePostAdminDto {
    const postId = object.params.postId;
    const result = UpdatePostAdminSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { value } = result;

    return UpdatePostAdminDto.create(postId, value);
  }
}
