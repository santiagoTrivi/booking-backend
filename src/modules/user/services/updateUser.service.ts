import { BadRequestError } from "../../common/domain/exceptions/badRequest.exception";
import { updateUserDto } from "../domain/dtos/updateDto";
import { User } from "../model/user.model";
import { getUserByIdService } from "./getUserById.service";

export const updateUserService = async (
  myUserId: string,
  updateUserDto: updateUserDto
) => {
  const user = await getUserByIdService(myUserId);
  const { username, description, isPublic } = updateUserDto;

  if (username) {
    const userWithSameUsername = await User.findOne({ username });

    if (
      userWithSameUsername &&
      userWithSameUsername._id.toString() !== myUserId
    ) {
      // Ya existe un usuario con ese nombre de usuario
      throw new BadRequestError(
        "Ya hay un usuario registrado con ese username",
        "UPDATE NOT ALLOWED"
      );
    } else {
      user.username = username;
    }
  }

  if (description) {
    user.description = description;
  }

  if (isPublic !== undefined) {
    user.isPublic = isPublic;
  }

  const updatedUser = await user.save();

  if (!updatedUser)
    throw new BadRequestError(
      "No se pudo actualizar el usuario",
      "UPDATE NOT ALLOWED"
    );

  return;
};
