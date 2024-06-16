import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { PostAdminService } from "./services/postAdmin.service";
import { UpdatePostAdminDtoAdapter } from "./adapter/updatePostAdmin.adapter";
import { FieldQueryPostDtoAdapter } from "./adapter/fieldpostQuery.adapter";

export class PostAdminController {
  private postAdminService;

  constructor() {
    this.postAdminService = new PostAdminService();
  }

  getPost = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const fieldQuery = new FieldQueryPostDtoAdapter().adapt(req);
      const response = await this.postAdminService.getPost(fieldQuery);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const updatepostAdmin = new UpdatePostAdminDtoAdapter().adapt(req);
      await this.postAdminService.update(updatepostAdmin);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
  delete = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      console.log(req.params.postId);
      await this.postAdminService.delete(req.params.postId);
      return res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}
