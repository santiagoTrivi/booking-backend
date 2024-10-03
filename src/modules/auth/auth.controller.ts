import { NextFunction, Request, Response } from "express";
import { registerNewUserService } from "./services/registerNewUser.service";
import { loginUserService } from "./services/loginUser.service";
import { RegisterUserDto } from "./domain/dtos/registerUser.dto";
import { RequestExt } from "../common/domain/req-ext";
import { AuthenticationSerivce } from "./domain/authenticaticationService.interface";
import { RefreshTokenDto } from "./domain/dtos/refreshToken.dto";
import { LoginDto } from "./domain/dtos/login.dto";
import { GetProfileService } from "../user/services/getProfile.service";
import { RegisterUserAdapter } from "./adapter/register.user.adapter";
import { LoginDtoAdapter } from "./adapter/login.adapter";
import { RefreshTokenAdapter } from "./adapter/refreshToken.adapter";
import { CreateUserWithPhoneAdapter } from "./adapter/create.user.with.phone.adapter";
import { CreateUserWithPhoneService } from "./services/createUserWithPhone.service";

export class AuthController {
  private getProfileService = new GetProfileService();
  constructor(private readonly authenticationService: AuthenticationSerivce) {}

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerUserDto = new RegisterUserAdapter().adapt(req);
      const response = await registerNewUserService(registerUserDto);
      const { password, ...data } = response;
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };
  createUserWithPhone = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createUserWithPhoneDto = new CreateUserWithPhoneAdapter().adapt(req);
      const response = await CreateUserWithPhoneService(createUserWithPhoneDto);
      const { password, ...data } = response;
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginDto = new LoginDtoAdapter().adapt(req);
      const user = await loginUserService(loginDto);
      const tokens = await this.authenticationService.login(user);
      res.status(201).json(tokens);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const { refreshToken } = new RefreshTokenAdapter().adapt(req);

      const token = await this.authenticationService.refreshToken(
        user?.id,
        refreshToken
      );

      return res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  };

  getMe = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      const response = await this.getProfileService.run(userId);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { user } = req;

      await this.authenticationService.logout(user?.id);

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  };
}
