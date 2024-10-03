import { BadRequestError } from "../../../common/domain/exceptions/badRequest.exception";
import { Validators } from "../../../common/domain/validators";

export class CreateUserwithPhoneDto {
  private constructor(
    public phone: string,
    public password: string,
    public username: string,
  ) {}

  static create(object: Record<string, any>): CreateUserwithPhoneDto {
    const { phone, password, username, role_id } = object;

    if (!password)
      throw new BadRequestError("password is required", "DATA REQUIRED");
    if (password.length < 6)
      throw new BadRequestError("the password is too short", "NOT VALID");
    if (!username)
      throw new BadRequestError("username is required", "DATA REQUIRED");

    return new CreateUserwithPhoneDto(phone, password, username);
  }
}