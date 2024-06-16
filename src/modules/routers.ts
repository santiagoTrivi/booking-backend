import { Express } from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import { errorHandle } from "../middleware/errorHandler";
import ReservationRouter from "./event/Reservation.router";

export const routers = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/reservations", ReservationRouter);

  // error handle
  app.use(errorHandle);
};
