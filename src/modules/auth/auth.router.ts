import { Router } from "express";
import { AuthController } from "./auth.controller";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { refreshTokenGuard } from "../../middleware/refreshTokenGuard";
import { AuthenticationAppService } from "./services/authentication.service";
import { authenticationGuard } from "../../middleware/authenticationGuard";

class AuthRouter extends DomainRouter {
  router: Router = Router();
  private controller = new AuthController(new AuthenticationAppService());

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    /**
     * @openapi
     * /auth/register:
     *  post:
     *     tags:
     *     - auth
     *     description: register a new user
     *     requestBody:
     *        description: user data
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/RegisterUserDto'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/UserDataDto"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
     *       422:
     *          description: Unprocessable entity
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error422'
     *       401:
     *          description: Unanthorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error401'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.post("/register", this.controller.registerUser);

    // Login
    /**
     * @openapi
     * /auth/login:
     *  post:
     *     tags:
     *     - auth
     *     description: user login
     *     requestBody:
     *        description:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/LoginDto'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/Authentication"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
     *       422:
     *          description: Unprocessable entity
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error422'
     *       401:
     *          description: Unanthorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error401'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.post("/login", this.controller.login);
    /**
     * @openapi
     * /auth/refreshTokens:
     *  post:
     *     tags:
     *     - auth
     *     description: refresh Tokens to renew the session
     *     requestBody:
     *        description:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/RefreshTokenDto'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/AuthenticationToken"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
     *       422:
     *          description: Unprocessable entity
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error422'
     *       401:
     *          description: Unanthorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error401'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.post(
      "/refreshTokens",
      refreshTokenGuard,
      this.controller.refresh
    );
    /**
     * @openapi
     * /auth/me:
     *  get:
     *     tags:
     *     - auth
     *     security:
     *      - bearerAuth: []
     *     description: get user info
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/UserMeDataDto"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
     *       422:
     *          description: Unprocessable entity
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error422'
     *       401:
     *          description: Unanthorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error401'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.get("/me", authenticationGuard, this.controller.getMe);
    /**
     * @openapi
     * /auth/logout:
     *  post:
     *     tags:
     *     - auth
     *     security:
     *      - bearerAuth: []
     *     description: log out user session
     *     responses:
     *       201:
     *         description: empty respose for successfull logout
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
     *       422:
     *          description: Unprocessable entity
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error422'
     *       401:
     *          description: Unanthorized
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error401'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.post("/logout", authenticationGuard, this.controller.logout);
  }
}

export default new AuthRouter().router;
