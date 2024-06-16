import { NextFunction, Request, Response } from "express";
import { GetUserService } from "./services/getUsers.service";
import {
  UpdatePasswordService,
  getUserBalanceService,
  getUserByIdService,
  updateUserService,
} from "./services";
import { RequestExt } from "../common/domain/req-ext";
import { AuthenticationException } from "../common/domain/exceptions/authentication.exception";
import { ImageLocalRepository } from "../../utils/imageLocalRepository";
import { GetProfileService } from "./services/getProfile.service";
import { FilterUsersQueryDto } from "./domain/dtos/filterUsersQuery.dto";
import { DataCipher } from "../common/services";
import { SearchQueryDtoAdapter } from "../common/adapter/SearchQuery.adapter";
import { UpdateUserPasswordDtoAdapter } from "./adapter/updateUserPassword.adapter";
import { UpdateUserDtoAdapter } from "./adapter/updateUser.adapter";
import { updateUserProfilePicture } from "./services/updateUserProfilePicture.service";
import { BadRequestError } from "../common/domain/exceptions/badRequest.exception";

export class UserController {
  private imageLocalRepository = new ImageLocalRepository();
  private getProfileService = new GetProfileService();
  private getUsersSerivce = new GetUserService();
  private updatePasswordService = new UpdatePasswordService(new DataCipher());

  updateData = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const myUserId = req.user?.id;
      const updateUserDto = new UpdateUserDtoAdapter().adapt(req);
      const response = await updateUserService(myUserId, updateUserDto);

      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  updateProfilePicture = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.file);
      const myUserId = req.user?.id;
      if (!req.file) {
        throw new BadRequestError(
          "No se proporcionó un archivo",
          "FILE NOT FOUND"
        );
      }
      const profilePicture = req.file.filename;
      await updateUserProfilePicture(myUserId, profilePicture);

      return res.json({});
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;
      const updateUserPasswordDto = new UpdateUserPasswordDtoAdapter().adapt(
        req
      );

      const response = await this.updatePasswordService.run(
        userId,
        updateUserPasswordDto
      );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getBalance = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      // Obtén el ID del usuario del token JWT desde req.user
      const user = req.user;

      // Verifica si el usuario está autenticado
      if (!user) {
        throw new AuthenticationException(
          "No se proporcionó un token de autenticación válido",
          "token not valid"
        );
      }
      // Luego, busca el saldo del usuario usando el ID
      const userId = user.id;
      const balance = await getUserBalanceService(userId);
      // Verifica si se encontró el saldo y envía la respuesta
      res.json({ userBalance: balance });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      const response = await this.getProfileService.run(userId);
      res.send(response);
    } catch (error) {
      next(error);
    }
  };

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = new SearchQueryDtoAdapter().adapt(req);
      const filterUsersQueryDto = FilterUsersQueryDto.create(req.query);
      const response = await this.getUsersSerivce.run(filterUsersQueryDto, {
        page,
        limit,
      });
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getProfilePicture = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      const { profilePicture } = await getUserByIdService(userId);
      if (profilePicture) {
        const image =
          this.imageLocalRepository.getProfilePicture(profilePicture);
        return res.status(200).sendFile(image);
      }
      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
}
