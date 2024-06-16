import { SERVICE_TYPE } from "../../common/domain";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
// import { TransactionEnum } from "../../transaction/domain/transaction.type";
// import { createChargeService } from "../../transaction/services";
import { getUserByIdService } from "../../user/services";
import { CreateReservationDto } from "../domain/createReservation.dto";
import { Reservation } from "../model/Reservation.model";

export const createReservationService = async (
  createReservationDto: CreateReservationDto
) => {
  const { created_by, setDate, hour } = createReservationDto;

  const foundReservation = await Reservation.findOne({
    setDate,
    hour,
  });

  if (foundReservation) {
    throw new BadRequestError(
      "reservation already exists",
      "RESERVATION_ERROR"
    );
  }

  const foundUser = await getUserByIdService(created_by);

  return await Reservation.create({ created_by: foundUser, setDate, hour });
};
