import { NextFunction, Response } from "express";
import { RequestExt } from "../modules/common/domain/req-ext";
import { ForbiddenException } from "../modules/common/domain/exceptions/forbidden.exception";

export const roleGuard = (alowedRoles: string[]) => {
  return (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { roles } = req;

      if (!roles)
        throw new ForbiddenException("user forbidden: ROLE NOT VALID");

      const hasValidRole = roles.some((userRole) =>
        alowedRoles.includes(userRole)
      );

      if (!hasValidRole) {
        throw new ForbiddenException("user forbidden: ROLE NOT VALID");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
