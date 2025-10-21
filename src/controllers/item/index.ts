import { Request, Response } from "express";

import { EStatusCode } from "../../models/status_code";
import { ItemService } from "../../services/item";

export const GetAllItemsController = async (_: Request, res: Response) => {
  try {
    const response = await ItemService.getAllItems();
    res.status(EStatusCode.OK).json(response);
  } catch (error) {
    res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const GetItemByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await ItemService.getItemById(id);
    if (response) {
      res.status(EStatusCode.OK).json(response);
    } else {
      res.status(EStatusCode.NOT_FOUND).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const CreateItemController = async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    const response = await ItemService.createItem(itemData);
    res.status(EStatusCode.CREATED).json(response);
  } catch (error) {
    res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const UpdateItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const itemData = req.body;
    const response = await ItemService.updateItem(id, itemData);
    if (response) {
      res.status(EStatusCode.OK).json(response);
    } else {
      res.status(EStatusCode.NOT_FOUND).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const DeleteItemController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await ItemService.deleteItem(id);
    if (success) {
      res.status(EStatusCode.NO_CONTENT).send();
    } else {
      res.status(EStatusCode.NOT_FOUND).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(EStatusCode.INTERNAL_SERVER_ERROR).json({ error });
  }
};

export const ItemController = {
  GetAllItemsController,
  GetItemByIdController,
  CreateItemController,
  UpdateItemController,
  DeleteItemController,
};
