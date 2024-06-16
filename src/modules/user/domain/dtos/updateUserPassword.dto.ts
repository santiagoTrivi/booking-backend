import { BadRequestError } from "../../../common/domain/exceptions/badRequest.exception";

export class UpdateUserPasswordDto {
  constructor(
    public currentPassword: string,
    public newPassword: string,
    public confirmPassword: string
  ) {}
}
