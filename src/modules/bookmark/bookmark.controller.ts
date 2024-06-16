import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import {
  createBookmarkService,
  deleteBookmarkService,
  getBookmarksService,
} from "./services";
import { BookmarkProps } from "./domain/bookmarkProps.interface";
import { CreateBookmarkDto } from "./domain/dtos/createBookMark.dto";
import { PaginateUserBookMarks } from "./services/paginateUserBookmarks.service";
import { GetPaginationParamsQuryDto } from "../common/domain/getPaginationParamsQuery.dto";
import { CreateBlockDtoAdapter } from "./adapter/createBookMark.adapter";
import { PaginataionQueryDtoAdapter } from "../common/adapter/paginationQuery.adapter";

export class BookmarkController {
  private paginateUserBookMarks: PaginateUserBookMarks;

  constructor() {
    this.paginateUserBookMarks = new PaginateUserBookMarks();
  }

  getBookmark = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const { page, limit } = new PaginataionQueryDtoAdapter().adapt(req);
      const response = await this.paginateUserBookMarks.run(userId, {
        page,
        limit,
      });
      return res.send(response);
    } catch (error) {
      next(error);
    }
  };

  async createBookmark(req: RequestExt, res: Response, next: NextFunction) {
    try {
      const createBookmarkDto = new CreateBlockDtoAdapter().adapt(req);

      const responseItem = await createBookmarkService(createBookmarkDto);
      return res.status(201).json(responseItem);
    } catch (error) {
      next(error);
    }
  }

  async delteBookmark(req: RequestExt, res: Response, next: NextFunction) {
    try {
      const postBookmarked = req.params.postId;
      const myUserId = req.user?.id;

      const currentDate = new Date();
      const isoFormattedDate = currentDate.toISOString();

      const dataToBookmark: BookmarkProps = {
        post_bookmarked: `${postBookmarked}`,
        created_by_user: `${myUserId}`,
        markedAt: new Date(isoFormattedDate), // Convertir la cadena ISO 8601 a Date
      };

      const response = await deleteBookmarkService(dataToBookmark);
      res.send(response);
    } catch (error) {
      next(error);
    }
  }
}
