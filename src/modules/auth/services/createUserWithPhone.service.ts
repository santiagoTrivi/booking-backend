import { encrypt } from "../../../utils/bcrypt.handle";
import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { InternalServerError } from "../../common/domain/exceptions/internalServer.exception";
import { BankNumberGenerator } from "../../common/services/bankNumberGenerator";
import { DOMAIN_ROLES } from "../../role/domain/domain.roles";
import { RoleModel } from "../../role/model/role.model";
import { User } from "../../user/model/user.model";
import { CreateUserwithPhoneDto } from "../domain/dtos/createUserWithPhone.dtp";

export const CreateUserWithPhoneService = async (createUserwithPhoneDto: CreateUserwithPhoneDto) => {
    const { phone, password, username} = createUserwithPhoneDto;

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

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
        throw new BadRequestError(
            "El correo electrónico ya está en uso.",
            "ALREADY_USER"
        );
    }

    const passHash: string = await encrypt(password);
    const bankNumber = BankNumberGenerator.run();

    const newUser = await User.create({
        phone,
        password: passHash,
        username,
        isPublic: false,
        bankNumber
    });
    return newUser.toObject();
};