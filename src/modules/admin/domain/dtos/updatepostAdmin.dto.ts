import { PostProps } from "../../../post/domain/postProps.interface";

export type UpdatePostAdmin = Pick<PostProps, "status" | "isAvailable">;

export class UpdatePostAdminDto {
  constructor(
    public readonly postId: string,
    public readonly updatePostPatial: Partial<UpdatePostAdmin>
  ) {}
  static create(
    postId: string,
    updatePostPatial: Partial<UpdatePostAdmin>
  ): UpdatePostAdminDto {
    return new UpdatePostAdminDto(postId, updatePostPatial);
  }
}
