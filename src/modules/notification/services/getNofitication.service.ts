import { FilterQuery } from "mongoose";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { PublicUserDataFilter } from "../../common/services/mongooseUserSelectData";
import { Post } from "../../post/model/post.model";
import { User } from "../../user/model/user.model";
import Notification, {
  NotificationMongooseType,
} from "../model/notification.model";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { FieldQuery } from "../../common/domain/fieldQuery";
import { notificationProps } from "../domain/notificationProps.interface";

export class GetNotificationByUserIdService {
  private paginationMongoseService =
    new MongoosePaginationService<NotificationMongooseType>(Notification);

  run = async (
    userId: string,
    fieldNotificationQuery: FieldQuery<notificationProps>
  ) => {
    const query: FilterQuery<NotificationMongooseType> = {
      notify_to: userId,
    };

    const { field } = fieldNotificationQuery;

    if (field.isRead) {
      query.isRead = field.isRead;
    }

    const populate = [
      {
        path: "notify_by",
        model: User,
        select: PublicUserDataFilter,
      },
      {
        path: "notify_to",
        model: User,
        select: PublicUserDataFilter,
      },
      {
        path: "post",
        model: Post,
        select: {
          likes: 0,
          comments: 0,
          bookmarks: 0,
          reposts: 0,
          repost: 0,
          likesCount: 0,
          commentsCount: 0,
          repostsCount: 0,
          createdAt: 0,
          updatedAt: 0,
          reposted_by: 0,
        },
      },
    ];

    return await this.paginationMongoseService.paginate(
      query,
      fieldNotificationQuery,
      populate,
      undefined,
      { createdAt: -1 }
    );
  };
}
