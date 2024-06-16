import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { User } from "../model/user.model";

export const getUserByIdService = async (id: String) => {
  const response = await User.findOne({ _id: id, isActive: true });
  if (!response) throw new NotFoundException("USER NOT FOUND");
  return response;
};
