import { Request, Response } from "express";

import { ItemService } from "../../services/item";

const itemService = new ItemService();

/**
 * @openapi
 * /item:
 *   get:
 *     tags:
 *       - Item
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
const GetAllItems = async (req: Request, res: Response) => {
  const items = await itemService.getAllItems();
  res.json(items);
};

/**
 * @openapi
 * /item/{id}:
 *   get:
 *     tags:
 *       - Item
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
const GetItemById = async (req: Request, res: Response) => {
  const item = await itemService.getItemById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
};

/**
 * @openapi
 * /item:
 *   post:
 *     tags:
 *       - Item
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
const CreateItem = async (req: Request, res: Response) => {
  const newItem = await itemService.createItem(req.body);
  res.status(201).json(newItem);
};

/**
 * @openapi
 * /item/{id}:
 *   put:
 *     tags:
 *       - Item
 *     summary: Update an item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The updated item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
const UpdateItem = async (req: Request, res: Response) => {
  const updatedItem = await itemService.updateItem(req.params.id, req.body);
  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).send("Item not found");
  }
};

/**
 * @openapi
 * /item/{id}:
 *   delete:
 *     tags:
 *       - Item
 *     summary: Delete an item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       204:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
const DeleteItem = async (req: Request, res: Response) => {
  const success = await itemService.deleteItem(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
};

export const ItemController = {
  GetAllItems,
  GetItemById,
  CreateItem,
  UpdateItem,
  DeleteItem,
};
