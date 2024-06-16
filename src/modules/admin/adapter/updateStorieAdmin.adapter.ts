import Joi from "joi";
import { Adapter, errorJoiAdapter } from "../../common/schemas/adapter";
import { RequestExt } from "../../common/domain/req-ext";
import { STATUS_CONTENT } from "../../common/domain/status.content";
import {
  UpdateStorieAdmin,
  UpdateStorieAdminDto,
} from "../domain/dtos/updateStorieAdmin.dto";

export const UpdateStorieAdminSchema = Joi.object<Partial<UpdateStorieAdmin>>({
  status: Joi.string()
    .optional()
    .valid(STATUS_CONTENT.normal, STATUS_CONTENT.sersitive),
  isAvailable: Joi.boolean().optional(),
});

export class UpdateStorieAdminDtoAdapter extends Adapter<UpdateStorieAdminDto> {
  adapt(object: RequestExt): UpdateStorieAdminDto {
    const postId = object.params.postId;
    const result = UpdateStorieAdminSchema.validate(object.body, {
      abortEarly: false,
    });
    if (result.error) throw errorJoiAdapter(result.error);

    const { value } = result;

    return UpdateStorieAdminDto.create(postId, value);
  }
}
