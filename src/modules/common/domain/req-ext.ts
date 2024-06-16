import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { PaginationOption } from "./paginationOptions.interface";
import { RolesOptions } from "../../role/domain/domain.roles";

type reference = {
  id: string;
  postId: string;
  userId: string;
  authorId: string;
  receiverId: string;
  messageId: string;
  followingId: string;
  commentId: string;
  blockId: string;
  eventId: string;
  storieId: string;
};

export interface RequestExt
  extends Request<reference, any, any, PaginationOption> {
  user?: JwtPayload | { id: string };
  roles?: RolesOptions[];
}
