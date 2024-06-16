import { NextFunction, Response } from "express";
import { RequestExt } from "../common/domain/req-ext";
import { CreateReservationDtoAdapter } from "./adapter/createReservation.adapter";
import { SearchQueryDtoAdapter } from "../common/adapter/SearchQuery.adapter";
import { GetReservationPaginatedService } from "./services/getReservationPaginated.service";
import { createReservationService } from "./services/createReservation.service";
import { deleteReservationService } from "./services/deleteReservation.service";

export class ReservationController {
  private getEventPaginatedService = new GetReservationPaginatedService();

  createEvent = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const createReservationDto = new CreateReservationDtoAdapter().adapt(req);

      const eventCreated = await createReservationService(createReservationDto);
      return res.status(201).json(eventCreated);
    } catch (error) {
      next(error);
    }
  };

  getAllEvents = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const filterInputQuery = new SearchQueryDtoAdapter().adapt(req);
      const events = await this.getEventPaginatedService.getAllEvents(
        filterInputQuery
      );
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  getUserEvents = async (
    req: RequestExt,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filterInputQuery = new SearchQueryDtoAdapter().adapt(req);
      const { userId } = req.params;
      const foundEvents = await this.getEventPaginatedService.getUserEvent(
        userId,
        filterInputQuery
      );
      return res.status(200).json(foundEvents);
    } catch (error) {
      next(error);
    }
  };

  deleteEvent = async (req: RequestExt, res: Response, next: NextFunction) => {
    try {
      const { eventId } = req.params;
      const created_by = req.user?.id;
      await deleteReservationService({ eventId, created_by });

      return res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
}
