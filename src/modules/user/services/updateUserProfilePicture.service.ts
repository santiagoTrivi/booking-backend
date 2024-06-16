import { deleteFile } from "../../../utils/deleteFile";
import { ImageLocalRepository } from "../../../utils/imageLocalRepository";
import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { User } from "../model/user.model";

export const updateUserProfilePicture = async (
  userId: string,
  newPicute: string
) => {
  const imageLocalRepository = new ImageLocalRepository();

  const foundUser = await User.findOne({ _id: userId });

  if (!foundUser) throw new NotFoundException("USER NOT FOUND");

  const oldPicture = foundUser.profilePicture;

  await deleteFile(imageLocalRepository.getProfilePicture(oldPicture));

  foundUser.profilePicture = newPicute;

  await foundUser.save();
};
