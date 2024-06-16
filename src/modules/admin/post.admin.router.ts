import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { authenticationGuard } from "../../middleware/authenticationGuard";
import { roleGuard } from "../../middleware/roleGuard.middleware";
import { DOMAIN_ROLES } from "../role/domain/domain.roles";
import { PostAdminController } from "./post.admin.controller";

class PostAdminRouter extends DomainRouter {
  router: Router = Router();
  private controller = new PostAdminController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /admin/post/{postId}:
     *  patch:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: update post
     *     parameters:
     *      - name: postId
     *        required: true
     *        in: path
     *        description: postId
     *     requestBody:
     *        description: data to update
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/updatePostAdminDto'
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
      "/:postId",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.update
    );

    /**
     * @openapi
     * /admin/post/{postId}:
     *  delete:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: delete post logically
     *     parameters:
     *      - name: postId
     *        required: true
     *        in: path
     *        description: postId
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
      "/:postId",
      [
        authenticationGuard,
        roleGuard([DOMAIN_ROLES.superadmin, DOMAIN_ROLES.admin]),
      ],
      this.controller.delete
    );

    /**
     * @openapi
     * /admin/post/:
     *  get:
     *     tags:
     *     - admin
     *     security:
     *      - bearerAuth: []
     *     description: get or search posts by admins
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
     *               $ref: "#/components/schemas/paginatedPostDetailDto"
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
      this.controller.getPost
    );
  }
}

export default new PostAdminRouter().router;
