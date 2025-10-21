export interface ItemRepository {
  getAllItems(): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
  createItem(item: Item): Promise<Item>;
  updateItem(id: string, item: Partial<Item>): Promise<Item | null>;
  deleteItem(id: string): Promise<boolean>;
}

/**
 * @openapi
 * components:
 *  schemas:
 *   Item:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *     title:
 *      type: string
 *     price:
 *      type: number
 *     category:
 *      type: string
 *     description:
 *      type: string
 *     isComplete:
 *      type: boolean
 */
export interface Item {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  isComplete: boolean;
}
