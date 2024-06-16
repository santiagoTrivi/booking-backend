import { User } from "../../user/model/user.model";
import { verified } from "../../../utils/bcrypt.handle";
import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { IUser } from "../../user/domain/user.interface";
import { LoginDto } from "../domain/dtos/login.dto";

export const loginUserService = async (loginDto: LoginDto): Promise<IUser> => {
  const { username, password } = loginDto;
  const checkIs = await User.findOne({ username }).populate("role");
  if (!checkIs) throw new NotFoundException(" USER NOT FOUND");

  if (!checkIs.isActive)
    throw new BadRequestError(" USER NOT ACTIVE", "USER NOT ACTIVE");

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect)
    throw new BadRequestError("Contraseña incorrecta", "PASSWORD_INCORRECT");

  const data = checkIs.toJSON();

  return {
    id: checkIs._id.toString(),
    name: checkIs.name,
    username: checkIs.username,
    email: checkIs.email,
    isActive: checkIs.isActive,
    roles: checkIs.role.map((role) => role.value),
  } as IUser;
};
