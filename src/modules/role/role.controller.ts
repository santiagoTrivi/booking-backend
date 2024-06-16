import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { GetPaginationParamsQuryDto } from "../common/domain/getPaginationParamsQuery.dto";
import { RolesService } from "./service/getRolesPaginated.service";
import { PaginataionQueryDtoAdapter } from "../common/adapter/paginationQuery.adapter";

export class RoleController {
  private readonly roleService: RolesService;
  constructor() {
    this.roleService = new RolesService();
  }
  getRoles = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = new PaginataionQueryDtoAdapter().adapt(req);
      const response = await this.roleService.getRolePaginates({ page, limit });
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };
}
