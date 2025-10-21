import { randomUUID } from "crypto";

import { Item, ItemRepository } from "../models/business/item";
import { readItems, writeItems } from "../utils/read-db";

export class ItemService implements ItemRepository {
  async getAllItems(): Promise<Item[]> {
    return await readItems();
  }

  async getItemById(id: string): Promise<Item | null> {
    const items = await readItems();
    return items.find((item) => item.id === id) || null;
  }

  async createItem(item: Omit<Item, "id">): Promise<Item> {
    const items = await readItems();
    const newItem: Item = { ...item, id: randomUUID() };
    items.push(newItem);
    await writeItems(items);
    return newItem;
  }

  async updateItem(id: string, item: Partial<Item>): Promise<Item | null> {
    const items = await readItems();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) {
      return null;
    }
    items[index] = { ...items[index], ...item };
    await writeItems(items);
    return items[index];
  }

  async deleteItem(id: string): Promise<boolean> {
    const items = await readItems();
    const newItems = items.filter((item) => item.id !== id);
    if (newItems.length === items.length) {
      return false;
    }
    await writeItems(newItems);
    return true;
  }
}
