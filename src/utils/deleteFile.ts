import { unlink, existsSync } from "node:fs";
import { InternalServerError } from "../modules/common/domain/exceptions/internalServer.exception";

export const deleteFile = async (filePath: string) => {
  try {
    const existFile = existsSync(filePath);

    if (!existFile) {
      return;
    }

    await unlink(filePath, (error) => {
      if (error) {
        throw new InternalServerError(`${error.message}`, "FILE_NOT_FOUND");
      }
    });
  } catch (error) {
    throw error;
  }
};
