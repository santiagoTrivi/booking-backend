export class RegisterUserDto {
  private constructor(
    public email: string,
    public password: string,
    public username: string
  ) {}
}
