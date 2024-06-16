import cors from "cors";
import express, { Express } from "express";
import * as http from "http";
import morgan from "morgan";
import { logger, corsConfig, dbConnect } from "./config";
import { routers } from "./modules/routers";
import { morganMiddleware } from "./config/morgan.config";
import { ImageLocalRepository } from "./utils/imageLocalRepository";
import swaggerUI from "swagger-ui-express";
import { swaggerConfig } from "./docs/swagger.docs";

export class Server {
  private express: Express;
  private port: string | number;

  constructor(port: string | number) {
    this.port = port;
    this.express = express();
    this.express.use(morganMiddleware);
    this.express.use(express.json());
    this.express.use(cors());
    this.routers();
    this.middlewares();
    this.databaseHandle();
  }

  private async databaseHandle() {
    dbConnect()
      .then(() => {
        logger.info("mongodb connected successfully");
      })
      .catch((err) => {
        logger.error("mongodb connexion failed");
        throw err;
      });
  }

  private middlewares() {
    const PATH_STORAGE = new ImageLocalRepository().rootPath;
    this.express.use("/storage", express.static(PATH_STORAGE));
  }

  private routers() {
    this.express.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
    routers(this.express);
  }

  listen = async (): Promise<void> => {
    return new Promise((resolve) => {
      this.express.listen(this.port, () => {
        logger.info(
          `App is running at http://localhost:${
            this.port
          } in ${this.express.get("env")} mode`
        );
        logger.info(`App documentation at http://localhost:${this.port}/docs`);
        logger.info("Press CTRL-C to stop");
        resolve();
      });
    });
  };
}
