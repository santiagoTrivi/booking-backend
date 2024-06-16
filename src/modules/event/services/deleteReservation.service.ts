import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { DeleteReservationDto } from "../domain/deleteReservation.dto";
import { Reservation } from "../model/Reservation.model";

export const deleteReservationService = async (
  deleteEventDto: DeleteReservationDto
) => {
  const { eventId, created_by } = deleteEventDto;

  const deleted = await Reservation.findOneAndDelete({
    _id: eventId,
    created_by,
  });

  if (!deleted)
    throw new BadRequestError("SOMETHING WRONG HAPPNED", "DELETING ERROR");

  return deleted;
};
