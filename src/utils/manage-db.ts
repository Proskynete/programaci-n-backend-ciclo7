import fs from "fs/promises";
import path from "path";

import { Item } from "../models/business/item";

const dbPath = path.resolve(__dirname, "../db.json");

export const readItems = async (): Promise<Item[]> => {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

export const writeItems = async (items: Item[]): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(items, null, 2));
};
