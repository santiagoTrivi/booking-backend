import { Router } from "express";
import postAdminRouter from "./post.admin.router";
import adminRouter from "./admin.router";
import storieAdminRouter from "./storie.admin.router";

class RootAdminRouter {
  router: Router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.use("/user", adminRouter);
    this.router.use("/post", postAdminRouter);
    this.router.use("/storie", storieAdminRouter);
  }
}

export default new RootAdminRouter().router;
