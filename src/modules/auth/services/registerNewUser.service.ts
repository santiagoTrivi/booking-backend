import { UserProps } from "../../user/domain/userProps.interface";
import { User } from "../../user/model/user.model";
import { encrypt } from "../../../utils/bcrypt.handle";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { RegisterUserDto } from "../domain/dtos/registerUser.dto";
import { RoleModel } from "../../role/model/role.model";
import { DOMAIN_ROLES } from "../../role/domain/domain.roles";
import { InternalServerError } from "../../common/domain/exceptions/internalServer.exception";
import { BankNumberGenerator } from "../../common/services/bankNumberGenerator";

export const registerNewUserService = async ({
  email,
  password,
  username,
}: RegisterUserDto) => {
  const userRole = await RoleModel.findOne({ value: DOMAIN_ROLES.user });
  if (!userRole) {
    throw new InternalServerError("User role not found", "ROLE_NOT_FOUND");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    throw new BadRequestError(
      "El nombre de usuario ya está en uso.",
      "USERNAME_EXISTS"
    );
  }

  // Comprobar si el email ya existe en la base de datos
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError(
      "El correo electrónico ya está en uso.",
      "ALREADY_USER"
    );
  }

  // Hashear la contraseña
  const passHash: string = await encrypt(password);
  const bankNumber = BankNumberGenerator.run();
  // Crear un nuevo usuario
  const newUser = await User.create({
    email,
    password: passHash,
    username,
    role: userRole,
    bankNumber,
  });

  return newUser.toObject();
};
