import { Request } from "express";
import Joi from "joi";
import { UnprocessableEntityError } from "../domain/exceptions/unprocessableEntity.exception";
import { Issue } from "../domain/exceptions/domainError";
import { RequestExt } from "../domain/req-ext";

export abstract class Adapter<D> {
  abstract adapt(object: RequestExt | Request): D;
}

export const errorJoiAdapter = (errorJoi: Joi.ValidationError) => {
  const errors = errorJoi.details.map(
    (d) => ({ field: d.path[0] as string, message: d.message } as Issue)
  );
  return new UnprocessableEntityError(errors);
};

export const getIssueJoi = (errorJoi: Joi.ValidationError) => {
  return errorJoi.details.map(
    (d) => ({ field: d.path[0] as string, message: d.message } as Issue)
  );
};
