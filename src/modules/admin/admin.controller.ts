import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { GetUsersCountsService, RetrieveUserPaginated } from "./services";
import { retrieveSingleUserData } from "./services/retrieveSingleUserData.service";
import { FilterUsersQueryDto } from "../user/domain/dtos/filterUsersQuery.dto";
import { GetPaginationParamsQuryDto } from "../common/domain/getPaginationParamsQuery.dto";
import { CreateUserDto } from "./domain/dtos/createUser.dto";
import { CreateUserService } from "./services/createUser.service";
import { PaginataionQueryDtoAdapter } from "../common/adapter/paginationQuery.adapter";
import { ProfileRequestDto } from "../user/domain/dtos/profileRequest.dto";

export class AdminController {
  private getUserCountsService;
  private retrieveUsersPaginated;

  constructor() {
    this.getUserCountsService = new GetUsersCountsService();
    this.retrieveUsersPaginated = new RetrieveUserPaginated();
  }

  getUserCount = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const response = await this.getUserCountsService.run();
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const admin = req.user?.id;
      const { userId } = req.params;
      const response = await retrieveSingleUserData(userId);

      const profileRequest = await ProfileRequestDto.create(
        admin,
        userId,
        response.isPublic
      );

      profileRequest.profile = response;
      return res.status(200).json(profileRequest);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const filterDto = FilterUsersQueryDto.create(req.query);
      const { page, limit } = new PaginataionQueryDtoAdapter().adapt(req);

      const response = await this.retrieveUsersPaginated.run(filterDto, {
        page,
        limit,
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const createUserDto = CreateUserDto.create(req.body);
      await CreateUserService(createUserDto);
      return res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
