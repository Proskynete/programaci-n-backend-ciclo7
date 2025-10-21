import { Request, Response } from "express";

import { ItemService } from "../../services/item";

const itemService = new ItemService();

const GetAllItems = async (req: Request, res: Response) => {
  const items = await itemService.getAllItems();
  res.json(items);
};

const GetItemById = async (req: Request, res: Response) => {
  const item = await itemService.getItemById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
};

const CreateItem = async (req: Request, res: Response) => {
  const newItem = await itemService.createItem(req.body);
  res.status(201).json(newItem);
};

const UpdateItem = async (req: Request, res: Response) => {
  const updatedItem = await itemService.updateItem(req.params.id, req.body);
  if (updatedItem) {
    res.json(updatedItem);
  } else {
    res.status(404).send("Item not found");
  }
};

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
