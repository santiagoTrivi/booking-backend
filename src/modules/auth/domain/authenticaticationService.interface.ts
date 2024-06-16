import { IUser } from "../../user/domain/user.interface";
import {
  AuthenticationGuard,
  AuthenticationToken,
} from "./authentication.interface";

export interface AuthenticationSerivce {
  login(user: IUser): Promise<AuthenticationGuard>;
  getTokens(user: IUser): Promise<AuthenticationGuard>;
  updateRefreshToken(id: string, refreshTokenInput: string): Promise<void>;
  refreshToken(
    id: string,
    refreshTokenInput: string
  ): Promise<AuthenticationToken>;
  logout(id: string): Promise<void>;
}
