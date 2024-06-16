import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { authenticationGuard } from "../../middleware/authenticationGuard";
import { roleGuard } from "../../middleware/roleGuard.middleware";
import { DOMAIN_ROLES } from "../role/domain/domain.roles";
import { StorieAdminController } from "./storie.admin.controller";

class StorieAdminRouter extends DomainRouter {
  router: Router = Router();
  private controller = new StorieAdminController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /admin/storie/{storieId}:
     *  patch:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: update storie
     *     parameters:
     *      - name: storieId
     *        required: true
     *        in: path
     *        description: storieId
     *     requestBody:
     *        description: data to update
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/updateStorieAdminDto'
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
    this.router.patch(
      "/:storieId",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.update
    );

    /**
     * @openapi
     * /admin/storie/{storieId}:
     *  delete:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: delete storie logically
     *     parameters:
     *      - name: storieId
     *        required: true
     *        in: path
     *        description: storieId
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
    this.router.delete(
      "/:storieId",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.delete
    );

    /**
     * @openapi
     * /admin/storie/:
     *  get:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: get or search storie by admins
     *     parameters:
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *      - $ref: '#components/parameters/caption'
     *      - $ref: '#components/parameters/isAvailable'
     *      - $ref: '#components/parameters/status'
     *      - $ref: '#components/parameters/reportCount'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedStorieDetailDto"
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

    this.router.get(
      "/",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.admin, DOMAIN_ROLES.superadmin]),
      ],
      this.controller.get
    );
  }
}

export default new StorieAdminRouter().router;
