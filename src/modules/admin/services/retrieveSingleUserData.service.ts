import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { AdminUserAllowFilds } from "../../common/services/mongooseUserSelectData";
import { User } from "../../user/model/user.model";

export const retrieveSingleUserData = async (userId: string) => {
  const response = await User.findById(userId)
    .populate({ path: "role", select: { createdAt: 0, updatedAt: 0 } })
    .select(AdminUserAllowFilds)
    .lean();

  if (!response) throw new NotFoundException("NOT FOUND USERS");

  return response;
};
