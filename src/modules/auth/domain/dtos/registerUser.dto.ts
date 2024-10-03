export class RegisterUserDto {
  private constructor(
    public email: string,
    public password: string,
    public username: string
  ) {}
}

export class CreateUserwithPhoneDto {
  private constructor(
    public phone: string,
    public password: string,
    public username: string
  ) {}
}
