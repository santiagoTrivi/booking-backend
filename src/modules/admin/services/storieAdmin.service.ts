import { FilterQuery } from "mongoose";
import { ImageService } from "../../../utils/image.service";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { NotificationEnum } from "../../notification/domain/notificationType";
import { createNotificationService } from "../../notification/services";
import { StorieProps } from "../../storie/domain/storiesProps.interface";
import Storie, { StorieMongooseType } from "../../storie/model/storie.model";
import { getStorieByIdService } from "../../storie/services/getStorieById.service";
import { UpdateStorieAdminDto } from "../domain/dtos/updateStorieAdmin.dto";
import { User } from "../../user/model/user.model";
import { PublicUserDataFilter } from "../../common/services/mongooseUserSelectData";

export class StorieAdminService {
  private readonly imageService;
  private mongoosePaginationService =
    new MongoosePaginationService<StorieMongooseType>(Storie);
  constructor() {
    this.imageService = new ImageService();
  }

  async getStorie(fieldQuery: FieldQuery<StorieProps>) {
    const { field } = fieldQuery;
    const { status, isAvailable, reportCount } = field;

    let query: FilterQuery<StorieProps> = {};

    if (status) {
      query["status"] = status;
    }

    if (isAvailable !== undefined) {
      query["isAvailable"] = isAvailable;
    }

    if (reportCount) {
      query["reportCount"] = { $gte: reportCount };
    }

    const populate = [
      {
        path: "author",
        model: User,
        select: PublicUserDataFilter,
      },
    ];

    const selectedData = {
      likes: 0,
    };

    return await this.mongoosePaginationService.paginate(
      query,
      fieldQuery,
      populate,
      selectedData,
      { reportCount: -1 }
    );
  }
  async update(updatestorieAdmindto: UpdateStorieAdminDto) {
    const { storieId, updateStoriePatial } = updatestorieAdmindto;
    const { status, isAvailable } = updateStoriePatial;

    const storie = await getStorieByIdService(storieId);

    if (status) {
      storie.status = status;
    }

    if (isAvailable !== undefined) {
      storie.isAvailable = isAvailable;
    }
    await storie.save();
  }
  async delete(storieId: string) {
    const storie = await getStorieByIdService(storieId);

    if (storie.fileName !== undefined) {
      await this.imageService.delete(storie.fileName);
    }

    storie.fileName = undefined;
    storie.isAvailable = false;
    const saved = await storie.save();

    if (saved) {
      await createNotificationService({
        type: NotificationEnum.REPORT,
        notify_to: saved.author,
        notifiedAt: new Date(),
        isRead: false,
        message: "Your storie has been deleted",
      });
    }
  }
}
