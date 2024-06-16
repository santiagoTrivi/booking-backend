import { FilterQuery } from "mongoose";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { Bookmark, BookmarkMongoType } from "../model/bookmark.model";
import { Post } from "../../post/model/post.model";

export class PaginateUserBookMarks {
  private mongoosePaginationService =
    new MongoosePaginationService<BookmarkMongoType>(Bookmark);

  run = async (created_by_user: string, paginationDto: PaginationOption) => {
    const query: FilterQuery<BookmarkMongoType> = {
      created_by_user,
    };

    const populate = [
      {
        path: "post_bookmarked",
        model: Post,
      },
    ];

    return await this.mongoosePaginationService.paginate(
      query,
      paginationDto,
      populate,
      { createdAt: -1 }
    );
  };
}
