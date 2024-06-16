import { FilterQuery } from "mongoose";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { RoleModel, RoleMongooseType } from "../model/role.model";

export class RolesService {
  private paginationMongoseService =
    new MongoosePaginationService<RoleMongooseType>(RoleModel);

  getRolePaginates = async (paginationDto: PaginationOption) => {
    const query: FilterQuery<RoleMongooseType> = {};

    return await this.paginationMongoseService.paginate(
      query,
      paginationDto,
      [],
      {
        createdAt: 0,
        updatedAt: 0,
      }
    );
  };
}
