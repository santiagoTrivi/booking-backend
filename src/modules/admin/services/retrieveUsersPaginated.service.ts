import { FilterQuery } from "mongoose";
import { PaginationOption } from "../../common/domain/paginationOptions.interface";
import { MongoosePaginationService } from "../../common/services/mongoosePagination.service";
import { User, UserMongooseType } from "../../user/model/user.model";
import { FilterUserQuery } from "../../user/domain/dtos/filterUsersQuery.dto";
import { AdminUserAllowFilds } from "../../common/services/mongooseUserSelectData";

export class RetrieveUserPaginated {
    
    private mongoosePaginationService = new MongoosePaginationService<UserMongooseType>(User);

    run = async (filterUsersQueryDto: FilterUserQuery , paginationOptions: PaginationOption) => {

        let query: FilterQuery<UserMongooseType> = {};

        const { search } = filterUsersQueryDto;

        if(search){
            query = {
                $or:[
                    {username: {'$regex': `${search}`, '$options': 'i'}},
                    {name: {'$regex': `${search}`, '$options': 'i'}},
                    {description: {'$regex': `${search}`, '$options': 'i'}},
                    {email: {'$regex': `${search}`, '$options': 'i'}}
                ]
            }
        }
        
       
        return await this.mongoosePaginationService.paginate(query, paginationOptions, undefined, AdminUserAllowFilds);

    }

}