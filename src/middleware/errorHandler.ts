import { NextFunction, Request, Response } from "express";
import { DomainError } from "../modules/common/domain/exceptions/domainError";
import { InternalServerError } from "../modules/common/domain/exceptions/internalServer.exception";
import { HttptErrorResponse } from "../modules/common/domain/httpErrorReponse";
import { logger } from "../config";

const httpResponse = (
  error: DomainError,
  res: Response<HttptErrorResponse>
) => {
  return res.status(error.statusCode).json({
    error: error.error,
    message: error.message,
    statusCode: error.statusCode,
    issues: error.issues,
  });
};

export const errorHandle = (
  error: Error,
  req: Request,
  res: Response<HttptErrorResponse>,
  next: NextFunction
) => {
  if (error instanceof DomainError) {
    httpResponse(error, res);
  } else {
    logger.error(error.stack);

    const errorToUser = new InternalServerError(
      "INTERNAL_SERVER_ERROR. CHECK THE LOGS",
      "server error"
    );
    httpResponse(errorToUser, res);
  }
};
