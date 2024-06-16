import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { StorieAdminService } from "./services/storieAdmin.service";
import { UpdateStorieAdminDtoAdapter } from "./adapter/updateStorieAdmin.adapter";
import { FieldQueryStorieDtoAdapter } from "./adapter/fieldStorieQuery.adapter";

export class StorieAdminController {
  private storieAdminService;

  constructor() {
    this.storieAdminService = new StorieAdminService();
  }

  get = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const fieldQuery = new FieldQueryStorieDtoAdapter().adapt(req);
      const result = await this.storieAdminService.getStorie(fieldQuery);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const updateStorieAdminDto = new UpdateStorieAdminDtoAdapter().adapt(req);
      await this.storieAdminService.update(updateStorieAdminDto);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      await this.storieAdminService.delete(req.params.storieId);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}
