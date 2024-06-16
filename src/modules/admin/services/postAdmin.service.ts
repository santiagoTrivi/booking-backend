import { FilterQuery } from "mongoose";
import { ImageService } from "../../../utils/image.service";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { NotificationEnum } from "../../notification/domain/notificationType";
import { createNotificationService } from "../../notification/services";
import { PostProps } from "../../post/domain/postProps.interface";
import { Post, PostMongooseType } from "../../post/model/post.model";
import { getPostByIdService } from "../../post/services";
import { UpdatePostAdminDto } from "../domain/dtos/updatepostAdmin.dto";
import { User } from "../../user/model/user.model";
import { PublicUserDataFilter } from "../../common/services/mongooseUserSelectData";

export class PostAdminService {
  private readonly imageService;
  private mongoosePaginationService =
    new MongoosePaginationService<PostMongooseType>(Post);
  constructor() {
    this.imageService = new ImageService();
  }

  async getPost(fieldQuery: FieldQuery<PostProps>) {
    const { field } = fieldQuery;
    const { caption, status, isAvailable, reportCount } = field;

    let query: FilterQuery<PostMongooseType> = {};

    if (caption) {
      query["caption"] = { $regex: `${caption}`, $options: "i" };
    }

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
  async update(updatePostAdminDto: UpdatePostAdminDto) {
    const { postId, updatePostPatial } = updatePostAdminDto;
    const { status, isAvailable } = updatePostPatial;

    const post = await getPostByIdService(postId);

    if (status) {
      post.status = status;
    }

    if (isAvailable !== undefined) {
      post.isAvailable = isAvailable;
    }
    await post.save();
  }
  async delete(postId: string) {
    const post = await getPostByIdService(postId);

    if (post.fileName !== undefined) {
      await this.imageService.delete(post.fileName);
    }

    post.fileName = undefined;
    post.isAvailable = false;
    const saved = await post.save();

    if (saved) {
      await createNotificationService({
        type: NotificationEnum.REPORT,
        notify_to: saved.author,
        notifiedAt: new Date(),
        isRead: false,
        message: "Your post has been deleted",
      });
    }
  }
}
