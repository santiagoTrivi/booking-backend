import { RolesOptions } from "../../role/domain/domain.roles";

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  isActive: boolean;
  roles: RolesOptions[];
}
