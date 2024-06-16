import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { AdminController } from "./admin.controller";
import { authenticationGuard } from "../../middleware/authenticationGuard";
import { roleGuard } from "../../middleware/roleGuard.middleware";
import { DOMAIN_ROLES } from "../role/domain/domain.roles";

class AdminRouter extends DomainRouter {
  router: Router = Router();
  private controller = new AdminController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.get(
      "/counts",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.getUserCount
    );

    /**
     * @openapi
     * /admin/user/{id}:
     *  get:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: get user profile full info. for superadmin or admin user
     *     parameters:
     *      - name: userId
     *        required: true
     *        in: path
     *        description: user Id
     *     requestBody:
     *        description: data
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/profileAdminRequestDto'
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
     *       403:
     *          description: Forbidden
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error403'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.get(
      "/:userId",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.getUser
    );

    /**
     * @openapi
     * /admin/user/:
     *  get:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: get or search all user signedup for superadmin or admin
     *     parameters:
     *      - name: search
     *        required: false
     *        in: query
     *        description: search users by username, name, description or email
     *      - name: limit
     *        in: query
     *        description: limit
     *      - name: page
     *        in: query
     *        description: page
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedpublicAdminUserDto"
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
     *       403:
     *          description: Forbidden
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error403'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.get(
      "/",
      [
        // authenticationGuard,
        // roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.getAllUsers
    );

    /**
     * @openapi
     * /admin/user/create:
     *  post:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: create user by superAdmin, sending the role
     *     requestBody:
     *        description: data to create
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/createUserDto'
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
     *       403:
     *          description: Forbidden
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error403'
     *       500:
     *          description: Internal error response
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Error500'
     */
    this.router.post(
      "/create",
      [authenticationGuard, roleGuard([DOMAIN_ROLES.superadmin])],
      this.controller.createUser
    );
  }
}

export default new AdminRouter().router;
