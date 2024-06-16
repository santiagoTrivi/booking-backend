import { BadRequestError } from "../../../common/domain/exceptions/badRequest.exception";
import { Validators } from "../../../common/domain/validators";

export class CreateUserDto {
  private constructor(
    public email: string,
    public password: string,
    public username: string,
    public role_id: string
  ) {}

  static create(object: Record<string, any>): CreateUserDto {
    const { email, password, username, role_id } = object;

    if (!email) throw new BadRequestError("email is required", "DATA REQUIRED");
    if (!Validators.email.test(email))
      throw new BadRequestError("email not valid", "NOT VALID");
    if (!password)
      throw new BadRequestError("password is required", "DATA REQUIRED");
    if (password.length < 6)
      throw new BadRequestError("the password is too short", "NOT VALID");
    if (!username)
      throw new BadRequestError("username is required", "DATA REQUIRED");

    if (!role_id)
      throw new BadRequestError("role_id is required", "DATA REQUIRED");

    if (typeof role_id !== "string")
      throw new BadRequestError("role_id not valid", "NOT VALID");

    return new CreateUserDto(email, password, username, role_id);
  }
}
