import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { UserController } from "./user.controller";
import { authenticationGuard } from "../../middleware/authenticationGuard";
import { ProfilePictureUpload } from "../../middleware/profilePictureStorage";

class UserRouter extends DomainRouter {
  router: Router = Router();
  private controller = new UserController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /users/:
     *  get:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: get or search users
     *     parameters:
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *      - $ref: '#components/parameters/search'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedpublicUserDto"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    // this.router.get("/", this.controller.getUsers);

    /**
     * @openapi
     * /users/:
     *  patch:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: update user
     *     requestBody:
     *        description: data required
     *        content:
     *           application/json:
     *            schema:
     *              $ref: '#components/schemas/updateUserDto'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/emptyResponse"
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
    // this.router.patch("/", authenticationGuard, this.controller.updateData);

    /**
     * @openapi
     * /users/profilePicture/:
     *  put:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: update user
     *     requestBody:
     *        description: data required
     *        content:
     *          multipart/form-data:
     *            schema:
     *              $ref: '#components/schemas/updataProfilePictureDto'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/emptyResponse"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    this.router.put(
      "/profilePicture",
      ProfilePictureUpload.single("profilePicture"),
      authenticationGuard,
      this.controller.updateProfilePicture
    );

    /**
     * @openapi
     * /users/password:
     *  patch:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: update password
     *     requestBody:
     *        description: data required
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/updateUserPassworDto'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/emptyResponse"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    this.router.patch(
      "/password",
      authenticationGuard,
      this.controller.updatePassword
    );

    /**
     * @openapi
     * /users/getProfile/{userId}:
     *  get:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: get comment
     *     parameters:
     *      - name: userId
     *        required: true
     *        in: path
     *        description: user Id
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/profileRequestDto"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    this.router.get(
      "/getProfile/:userId",
      authenticationGuard,
      this.controller.getProfile
    );

    /**
     * @openapi
     * /users/getBalance:
     *  get:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: get balance
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/userBalanceDto"
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    this.router.get(
      "/getBalance",
      authenticationGuard,
      this.controller.getBalance
    );

    /**
     * @openapi
     * /users/{userId}/profilePicture:
     *  get:
     *     tags:
     *     - users
     *     security:
     *      - bearerAuth: []
     *     description: user profile picture
     *     parameters:
     *      - name: userId
     *        required: true
     *        in: path
     *        description: user Id
     *     responses:
     *       200:
     *         description:
     *         content:
     *       400:
     *          description: Bad request response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error400'
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
    this.router.get(
      "/:userId/profilePicture",
      authenticationGuard,
      this.controller.getProfilePicture
    );
  }
}

export default new UserRouter().router;
