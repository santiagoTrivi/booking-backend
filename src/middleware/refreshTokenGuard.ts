import { NextFunction, Response } from "express";
import { RequestExt } from "../modules/common/domain/req-ext";
import { UnauthorizedError } from "../modules/common/domain/exceptions/unauthorized.exception";
import { verifyRefrehToken } from "../utils/jwt.handle";
import { User } from "../modules/user/model/user.model";
import { NotFoundException } from "../modules/common/domain/exceptions/notFound.exception";
import { BadRequestError } from "../modules/common/domain/exceptions/badRequest.exception";

export const refreshTokenGuard = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const givenRefreshToken = req.body.refreshToken;

  try {
    if (!givenRefreshToken)
      throw new UnauthorizedError("USER UNANTHORIZED: REFRESH TOKEN REQUIRED");

    const verifiedToken = verifyRefrehToken(givenRefreshToken) as {
      id: string;
    };

    if (!verifiedToken)
      throw new UnauthorizedError("USER UNANTHORIZED: REFRESH TOKEN NOT VALID");

    const user = await User.findOne({
      _id: verifiedToken.id,
    });

    if (!user || !user.role)
      throw new NotFoundException("USER UNANTHORIZED: USER NOT FOUND");

    if (!user.isActive)
      throw new BadRequestError(" USER NOT ACTIVE", "USER NOT ACTIVE");

    req.user = verifiedToken;
    next();
  } catch (error) {
    next(error);
  }
};
