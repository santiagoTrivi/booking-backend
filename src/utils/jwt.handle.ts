import { sign, verify } from "jsonwebtoken";
import { configServer } from "../config";
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

const verifyToken = (jwt: string) => {
  try {
    const isOk = verify(jwt, configServer.JWT_SECRET);
    return isOk;
  } catch (error) {
    return false;
  }
};

export const verifyRefrehToken = (jwt: string) => {
  try {
    return verify(jwt, configServer.REFRESH_JWT_KEY);
  } catch (error) {
    return false;
  }
};

export { verifyToken };
