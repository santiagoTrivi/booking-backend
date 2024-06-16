import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { NotificationController } from "./notification.controller";
import { authenticationGuard } from "../../middleware/authenticationGuard";

class NotificationRouter extends DomainRouter {
  router: Router = Router();
  private controller = new NotificationController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /notifications/:
     *  get:
     *     tags:
     *     - notifications
     *     security:
     *      - bearerAuth: []
     *     description: get notifications
     *     parameters:
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *      - $ref: '#components/parameters/isRead'
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

    this.router.get("/", authenticationGuard, this.controller.getNotifications);

    /**
     * @openapi
     * /notifications/:
     *  patch:
     *     tags:
     *     - notifications
     *     security:
     *      - bearerAuth: []
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

    this.router.patch(
      "/",
      authenticationGuard,
      this.controller.updateNotification
    );
  }
}

export default new NotificationRouter().router;
