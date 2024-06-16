import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { authenticationGuard } from "../../middleware/authenticationGuard";
import { RoleController } from "./role.controller";
import { roleGuard } from "../../middleware/roleGuard.middleware";
import { DOMAIN_ROLES } from "./domain/domain.roles";

class RoleRouter extends DomainRouter {
  router: Router = Router();
  private controller = new RoleController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /roles/:
     *  get:
     *     tags:
     *     - roles
     *     security:
     *      - bearerAuth: []
     *     description: auth roles. only for superadmin and admin
     *     parameters:
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedRoles"
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
      [authenticationGuard, roleGuard([DOMAIN_ROLES.superadmin])],
      this.controller.getRoles
    );
  }
}

export default new RoleRouter().router;
