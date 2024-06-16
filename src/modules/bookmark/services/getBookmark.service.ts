import { Bookmark } from "../model/bookmark.model";


export const getBookmarksService = async (post_id?: string, myUserId?: string) => {
    
    const bookmarkExists = await Bookmark.exists({ post_bookmarked: post_id, created_by_user: myUserId });
  
    return {bookmarked : bookmarkExists ? true : false};
    
  };