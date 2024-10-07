import { FilterQuery } from "mongoose";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { FilterUserQuery } from "../domain/dtos/filterUsersQuery.dto";
import { User, UserMongooseType } from "../model/user.model";
import { Category } from "../../category/model/category.model";

export class GetUserService {
  private mongoosePaginationService =
    new MongoosePaginationService<UserMongooseType>(User);

  run = async (
    filterUsersQueryDto: FilterUserQuery,
    paginationOptions: PaginationOption
  ) => {
    let query: FilterQuery<UserMongooseType> = {};

    const { search } = filterUsersQueryDto;

    if (search) {
      query = {
        $or: [
          { username: { $regex: `${search}`, $options: "i" } },
          { name: { $regex: `${search}`, $options: "i" } },
          { description: { $regex: `${search}`, $options: "i" } },
        ],
      };
    }

    const selectedData = {
      balance: 0,
      password: 0,
      email: 0,
    };

    const populate = [
      {
        path: "category",
        model: Category,
        select: "name"
      },
    ];

    return await this.mongoosePaginationService.paginate(
      query,
      paginationOptions,
      populate,
      selectedData
    );
  };
}
