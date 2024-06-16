import { NextFunction, Response } from "express";
import { RequestExt } from "../modules/common/domain/req-ext";
import { UnauthorizedError } from "../modules/common/domain/exceptions/unauthorized.exception";
import { User } from "../modules/user/model/user.model";
import { NotFoundException } from "../modules/common/domain/exceptions/notFound.exception";
import { verifyToken } from "../utils/jwt.handle";
import { BadRequestError } from "../modules/common/domain/exceptions/badRequest.exception";

export const authenticationGuard = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const jwtByUser = req.headers.authorization?.split(" ")[1];

  try {
    if (!jwtByUser)
      throw new UnauthorizedError("USER UNANTHORIZED: JWT REQUIRED");

    const authorizedUser = verifyToken(jwtByUser) as { id: string };

    if (!authorizedUser)
      throw new UnauthorizedError("USER UNANTHORIZED: JWT NOT VALID");

    const user = await User.findOne({
      _id: authorizedUser.id,
    }).populate("role");
    if (!user || !user.role)
      throw new NotFoundException("USER UNANTHORIZED: USER NOT FOUND");

    if (!user.isActive)
      throw new BadRequestError(" USER NOT ACTIVE", "USER NOT ACTIVE");

    const roles = user.role.map((role) => role.value);

    req.user = authorizedUser;
    req.roles = roles;
    next();
  } catch (error) {
    next(error);
  }
};
