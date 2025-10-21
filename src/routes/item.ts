import { Router } from "express";

import { ItemController } from "../controllers/item";

const router = Router();

/**
 * @openapi
 * /api/v1/item:
 *  get:
 *    tags:
 *      - Items
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Item'
 */
router.get("/", ItemController.GetAllItemsController);

/**
 * @openapi
 * /api/v1/item/{id}:
 *  get:
 *    tags:
 *      - Items
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The item ID
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 */
router.get("/:id", ItemController.GetItemByIdController);

/**
 * @openapi
 * /api/v1/item:
 *  post:
 *    tags:
 *      - Items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 */
router.post("/", ItemController.CreateItemController);

/**
 * @openapi
 * /api/v1/item/{id}:
 *  put:
 *    tags:
 *      - Items
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The item ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 */
router.put("/:id", ItemController.UpdateItemController);

/**
 * @openapi
 * /api/v1/item/{id}:
 *  delete:
 *    tags:
 *      - Items
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: The item ID
 */
router.delete("/:id", ItemController.DeleteItemController);

export { router };
