import { encrypt } from "../../../utils/bcrypt.handle";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { InternalServerError } from "../../common/domain/exceptions/internalServer.exception";
import { BankNumberGenerator } from "../../common/services/bankNumberGenerator";
import { RoleModel } from "../../role/model/role.model";
import { User } from "../../user/model/user.model";
import { CreateUserDto } from "../domain/dtos/createUser.dto";

export const CreateUserService = async (createUserDto: CreateUserDto) => {
  const { email, password, username, role_id } = createUserDto;

  const role = await RoleModel.findById(role_id);
  if (!role) {
    throw new InternalServerError("role does not exist", "ROLE_NOT_FOUND");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw new BadRequestError(
      "El nombre de usuario ya está en uso.",
      "USERNAME_EXISTS"
    );
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError(
      "El correo electrónico ya está en uso.",
      "ALREADY_USER"
    );
  }

  const passHash: string = await encrypt(password);
  const bankNumber = BankNumberGenerator.run();

  await User.create({
    email,
    password: passHash,
    username,
    role,
    bankNumber,
  });
};
