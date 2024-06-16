import { SUPERADMIN } from "../../../config";
import { encrypt } from "../../../utils/bcrypt.handle";
import { InternalServerError } from "../../common/domain/exceptions/internalServer.exception";
import { BankNumberGenerator } from "../../common/services/bankNumberGenerator";
import { DOMAIN_ROLES } from "../../role/domain/domain.roles";
import { RoleModel } from "../../role/model/role.model";
import { User } from "../../user/model/user.model";

export const CreateSuperAdminService = async () => {
  const superAdmin = await User.findOne({ email: SUPERADMIN.email });

  if (superAdmin) return;

  const role = await RoleModel.findOne({ value: DOMAIN_ROLES.superadmin });
  if (!role) {
    throw new InternalServerError(
      "superadmin role not found",
      "ROLE_NOT_FOUND"
    );
  }

  if (!SUPERADMIN.username || !SUPERADMIN.password || !SUPERADMIN.email) {
    throw new InternalServerError(
      "superadmin not found",
      "SUPERADMIN_NOT_FOUND"
    );
  }

  const passHash: string = await encrypt(SUPERADMIN.password);
  const bankNumber = BankNumberGenerator.run();
  const { email, username } = SUPERADMIN;
  // Crear un nuevo usuario
  await User.create({
    email,
    password: passHash,
    username,
    isPublic: false,
    role,
    bankNumber,
  });
};
