import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { ReservationController } from "./Reservation.controller";
import { authenticationGuard } from "../../middleware/authenticationGuard";

class ReservationRouter extends DomainRouter {
  public router = Router();
  private controller = new ReservationController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /reservations/:
     *  post:
     *     tags:
     *     - reservations
     *     security:
     *      - bearerAuth: []
     *     description: create an event
     *     requestBody:
     *        description: data required
     *        content:
     *          multipart/json:
     *            schema:
     *              $ref: '#components/schemas/createEventDto'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/eventDto"
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
    this.router.post("/", authenticationGuard, this.controller.createEvent);

    /**
     * @openapi
     * /reservations/:
     *  get:
     *     tags:
     *     - reservations
     *     security:
     *      - bearerAuth: []
     *     description: get reservations
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
     *               $ref: "#/components/schemas/paginatedAllEvent"
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
    this.router.get("/", authenticationGuard, this.controller.getAllEvents);
    /**
     * @openapi
     * /reservations/{userId}:
     *  get:
     *     tags:
     *     - reservations
     *     security:
     *      - bearerAuth: []
     *     description: get comment
     *     parameters:
     *      - name: userId
     *        required: true
     *        in: path
     *        description: postId
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *      - $ref: '#components/parameters/search'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedUserEvent"
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
      "/:userId",
      authenticationGuard,
      this.controller.getUserEvents
    );

    /**
     * @openapi
     * /reservations/{eventId}:
     *  delete:
     *     tags:
     *     - reservations
     *     security:
     *      - bearerAuth: []
     *     description: delete
     *     parameters:
     *      - name: eventId
     *        required: true
     *        in: path
     *        description: event id
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/eventDto"
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
    this.router.delete(
      "/:eventId",
      authenticationGuard,
      this.controller.deleteEvent
    );
  }
}

export default new ReservationRouter().router;
