import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { Post } from "../../post/model/post.model";
import { BookmarkProps } from "../domain/bookmarkProps.interface";
import { Bookmark } from "../model/bookmark.model";

export const deleteBookmarkService = async ({
  post_bookmarked,
  created_by_user,
}: BookmarkProps) => {
  const deletedOne = await Bookmark.findOneAndRemove({
    post_bookmarked,
    created_by_user,
  });

  if (!deletedOne)
    throw new BadRequestError("something went wrong", "BOOKMARK NOT DELETED");

  const foundPost = await Post.findById(deletedOne.post_bookmarked);

  if (!foundPost) throw new NotFoundException("POST NOT FOUND");

  const indexReference = foundPost.bookmarks.indexOf(deletedOne._id);
  foundPost.bookmarks.splice(indexReference, 1);
  await foundPost.save();

  return deletedOne;
};
