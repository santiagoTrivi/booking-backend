import { sign } from "jsonwebtoken";
import { UserProps } from "../../user/domain/userProps.interface";
import { AuthenticationSerivce } from "../domain/authenticaticationService.interface";
import {
  AuthenticationGuard,
  AuthenticationToken,
} from "../domain/authentication.interface";
import { CONFIG_JWT_TIMING, configServer } from "../../../config";
import { Authentication } from "../model/authentication.model";
import { DataCipher } from "../../common/services";
import { DataCipherGeneric } from "../../common/domain";
import { ForbiddenException } from "../../common/domain/exceptions/forbidden.exception";
import { IUser } from "../../user/domain/user.interface";

export class AuthenticationAppService implements AuthenticationSerivce {
  private dataCipher: DataCipherGeneric = new DataCipher();

  async login(user: IUser): Promise<AuthenticationGuard> {
    const { id } = user;
    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(id, tokens.refresh_token);

    return tokens;
  }

  async getTokens(user: IUser): Promise<AuthenticationGuard> {
    const { id, roles } = user;
    const access_token = await sign({ id }, configServer.JWT_SECRET, {
      expiresIn: CONFIG_JWT_TIMING.access_token_expireIn,
    });

    const refresh_token = await sign({ id }, configServer.REFRESH_JWT_KEY, {
      expiresIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
    });

    return {
      user_id: id,
      roles,
      access_token,
      expireIn: CONFIG_JWT_TIMING.access_token_expireIn,
      refresh_token,
      refresh_expireIn: CONFIG_JWT_TIMING.refresh_token_expireIn,
    } as AuthenticationGuard;
  }
  async updateRefreshToken(
    id: string,
    refreshTokenInput: string
  ): Promise<void> {
    const foundAuth = await Authentication.findOne({ user: id });

    if (!foundAuth) {
      await Authentication.create({
        user: id,
        refreshToken: refreshTokenInput,
      });
      return;
    }

    foundAuth.refreshToken = refreshTokenInput;

    await foundAuth.save();
    return;
  }
  refreshToken = async (
    id: string,
    refreshTokenInput: string
  ): Promise<AuthenticationToken> => {
    const foundAuth = await Authentication.findOne({ user: id });

    if (!foundAuth || !foundAuth.refreshToken)
      throw new ForbiddenException("AUTHENTICATION NOT FOUND");

    const { refreshToken } = foundAuth;

    const refreshTokenValidation = refreshToken === refreshTokenInput;

    if (!refreshTokenValidation) throw new ForbiddenException("ACCESS DENIED");

    const userId = foundAuth.user.toString();
    const access_token = await sign({ id: userId }, configServer.JWT_SECRET, {
      expiresIn: CONFIG_JWT_TIMING.access_token_expireIn,
    });

    return {
      access_token,
      expireIn: CONFIG_JWT_TIMING.access_token_expireIn,
    };
  };

  async logout(id: string): Promise<void> {
    const foundAuth = await Authentication.findOne({ user: id });

    if (!foundAuth) throw new ForbiddenException("AUTHENTICATION NOT FOUND");

    foundAuth.refreshToken = null;

    await foundAuth.save();
    return;
  }
}
