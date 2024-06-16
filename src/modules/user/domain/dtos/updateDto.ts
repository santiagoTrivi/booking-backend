import { UserProps } from "../userProps.interface";

export type updateUserDto = Partial<UserProps>;

export type updateProfilePictureDto = Pick<UserProps, "profilePicture">;
