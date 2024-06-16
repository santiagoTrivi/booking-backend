import { NotFoundException } from "../../common/domain/exceptions/notFound.exception";
import { retrieveProfile } from "./retrieveProfile";
import { retrieveOwnProfile } from "./retrieveOwnProfile";
import { User } from "../model/user.model";

export class GetProfileService {
  private getUser = async (id: string) => {
    const response = await retrieveOwnProfile(id);

    if (!response) throw new NotFoundException("USER NOT FOUND");

    return response;
  };

  private aggregateProfileGet = async (folowerId: string, userId: string) => {
    const data = await retrieveProfile(folowerId, userId);

    if (!data) throw new NotFoundException("USER NOT FOUND");

    return data;
  };

  run = async (id: string) => {
    const foundUser = await User.findById(id);
    if (!foundUser) throw new NotFoundException("USER NOT FOUND");

    return foundUser;
  };
}
