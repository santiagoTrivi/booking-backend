import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { User } from "../model/user.model";

export const getUserBalanceService = async (userId: String) => {
  const user = await User.findById(userId, "balance");

  if (!user)
    throw new NotFoundException("verifica si el usuaris esta registrado");

  return user.balance;
};
