import { BadRequestError } from "../../../common/domain/exceptions/badRequest.exception";

export class RefreshTokenDto {
  private constructor(public refreshToken: string) {}
}
