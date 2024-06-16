import { Schema, Types, model, Model, Document } from "mongoose";
import { BookmarkProps } from "../domain/bookmarkProps.interface";

export interface BookmarkMongoType extends Document, BookmarkProps {}

const BookmarkMongoSchema = new Schema<BookmarkMongoType>(
  {
    post_bookmarked: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    created_by_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    markedAt:{
        type: Date,
        required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Bookmark = model("bookmark", BookmarkMongoSchema);
