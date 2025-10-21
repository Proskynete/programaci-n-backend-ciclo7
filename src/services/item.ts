import { Item, ItemRepository } from "../models/business/item";

const getAllItems = (): Promise<Item[]> => {
  return Promise.resolve([]);
};

const getItemById = (id: string): Promise<Item | null> => {
  return Promise.resolve(null);
};

const createItem = (item: Item): Promise<Item> => {
  return Promise.resolve(item);
};

const updateItem = (id: string, item: Partial<Item>): Promise<Item | null> => {
  return Promise.resolve(null);
};

const deleteItem = (id: string): Promise<boolean> => {
  return Promise.resolve(true);
};

export const ItemService: ItemRepository = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
