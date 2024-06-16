import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { getPostByIdService } from "../../post/services";
import { BookmarkProps } from "../domain/bookmarkProps.interface";
import { CreateBookmarkDto } from "../domain/dtos/createBookMark.dto";
import { Bookmark } from "../model/bookmark.model";

export const createBookmarkService = async (
  createBookmarkDto: CreateBookmarkDto
) => {
  const { postBookmarked, created_by_user } = createBookmarkDto;

  const foundPost = await getPostByIdService(postBookmarked);

  if (!foundPost) throw new NotFoundException("POST NOT FOUND");

  const createdBookmark = await Bookmark.create({
    post_bookmarked: postBookmarked,
    created_by_user,
    markedAt: new Date(),
  });

  if (!createdBookmark)
    throw new BadRequestError(
      "something went wrong creating the bookmark",
      "BOOKMARK NOT CREATED"
    );

  foundPost.bookmarks.push(createdBookmark);
  await foundPost.save();

  return createdBookmark;
};
