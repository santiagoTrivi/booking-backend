import { RolesOptions } from "../../role/domain/domain.roles";

export interface AuthenticationGuard {
  user_id: string;
  roles: RolesOptions[];
  expireIn: string;
  access_token: string;
  refresh_token: string;
  refresh_expireIn: string;
}

export type AuthenticationToken = Pick<
  AuthenticationGuard,
  "expireIn" | "access_token"
>;
