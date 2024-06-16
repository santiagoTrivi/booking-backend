import { Router } from "express";
import { DomainRouter } from "../common/domain/domainRouter.abstract";
import { BookmarkController } from "./bookmark.controller";
import { authenticationGuard } from "../../middleware/authenticationGuard";

class BookmarkRouter extends DomainRouter {
  router: Router = Router();
  private controller = new BookmarkController();

  constructor() {
    super();
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    /**
     * @openapi
     * /bookmarks/:
     *  get:
     *     tags:
     *     - bookmarks
     *     security:
     *      - bearerAuth: []
     *     description: get bookmark
     *     parameters:
     *      - $ref: '#components/parameters/page'
     *      - $ref: '#components/parameters/limit'
     *     responses:
     *       200:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/paginatedBlookMarks"
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
    this.router.get("/", authenticationGuard, this.controller.getBookmark);

    /**
     * @openapi
     * /bookmarks/:
     *  post:
     *     tags:
     *     - bookmarks
     *     security:
     *      - bearerAuth: []
     *     description: BookMark a post
     *     requestBody:
     *        description: Data to create a bookMark
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/createBookMarkDto'
     *     responses:
     *       201:
     *         description:
     *         content:
     *           application/json:
     *             schema:
     *               $ref: "#/components/schemas/bookMarkDto"
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
    this.router.post("/", authenticationGuard, this.controller.createBookmark);
    /**
     * @openapi
     * /bookmarks/{postId}:
     *  delete:
     *     tags:
     *     - bookmarks
     *     security:
     *      - bearerAuth: []
     *     description: delete
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
     *               $ref: "#/components/schemas/bookMarkDto"
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
      "/:postId",
      authenticationGuard,
      this.controller.delteBookmark
    );
  }
}

export default new BookmarkRouter().router;
