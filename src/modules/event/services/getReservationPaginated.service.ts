import { FilterQuery } from "mongoose";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { User } from "../../user/model/user.model";
import {
  PublicProfileDataFilter,
  PublicUserDataFilter,
} from "../../common/services/mongooseUserSelectData";
import { FilterInputQueryDto } from "../../common/domain/filterInputQuery.dto";
import {
  Reservation,
  ReservationmongooseType,
} from "../model/Reservation.model";

export class GetReservationPaginatedService {
  private mongoosePaginationService =
    new MongoosePaginationService<ReservationmongooseType>(Reservation);

  getAllEvents = async (filterInputQueryDto: FilterInputQueryDto) => {
    const { page, limit, search } = filterInputQueryDto;

    let query: FilterQuery<ReservationmongooseType> = {};

    const populate = [
      {
        path: "created_by",
        model: User,
        select: {
          username: 1,
          _id: 1,
          profilePicture: 1,
        },
      },
    ];

    return this.mongoosePaginationService.paginate(
      query,
      { page, limit },
      populate,
      undefined,
      { type: -1, createdAt: -1 }
    );
  };

  getUserEvent = async (
    created_by: string,
    filterInputQueryDto: FilterInputQueryDto
  ) => {
    const { page, limit, search } = filterInputQueryDto;

    let query: FilterQuery<ReservationmongooseType> = {
      created_by,
    };

    if (search) {
      query = {
        created_by,
        $or: [{ title: { $regex: `${search}`, $options: "i" } }],
      };
    }

    return this.mongoosePaginationService.paginate(query, { page, limit });
  };
}
