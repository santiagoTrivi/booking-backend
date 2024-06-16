import { BadRequestError } from "../../../common/domain/exceptions/badRequest.exception";

export class CreateBookmarkDto {
  private constructor(
    public postBookmarked: string,
    public created_by_user: string
  ) {}

  static create(
    postBookmarked: string,
    created_by_user: string
  ): CreateBookmarkDto {
    return new CreateBookmarkDto(postBookmarked, created_by_user);
  }
}
