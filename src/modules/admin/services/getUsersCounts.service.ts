import { User } from "../../user/model/user.model"


export class GetUsersCountsService{

    run = async () => {
        const data =  await User.aggregate([
            {
                $group: {
                    _id: null,
                    total_users: {$sum: 1},
                    inactive_users_count: { $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] } },
                    verified_users_count: { $sum: { $cond: [{ $eq: ["$verificado", true] }, 1, 0] } },
                    premium_users_count: { $sum: { $cond: [{ $eq: ["$premium", true] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    total_users: 1,
                    inactive_users_count: 1,
                    verified_users_count: 1,
                    premium_users_count: 1
                }
            }
        ])

        return data[0];
    }

}