import morgan from "morgan";
import { logger } from "./winston-logger";



const stream = {
    write: (message: any) => logger.http(message)
}

const skip = () => {
    const env = process.env.NODE_ENV;
    return env !== "development";
  };

export const morganMiddleware = morgan('dev', {stream, skip});