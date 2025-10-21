import { randomUUID } from "crypto";

import { Item } from "../../src/models/business/item";
import { ItemService } from "../../src/services/item";
import { readItems, writeItems } from "../../src/utils/manage-db";

jest.mock("../../src/utils/manage-db", () => ({
  readItems: jest.fn(),
  writeItems: jest.fn(),
}));

jest.mock("crypto", () => ({
  randomUUID: jest.fn(),
}));

describe("ItemService", () => {
  let itemService: ItemService;

  beforeEach(() => {
    itemService = new ItemService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllItems", () => {
    it("should return all items", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const items = await itemService.getAllItems();

      expect(items).toEqual(mockItems);
      expect(readItems).toHaveBeenCalledTimes(1);
    });
  });

  describe("getItemById", () => {
    it("should return an item by id", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const item = await itemService.getItemById("1");

      expect(item).toEqual(mockItems[0]);
      expect(readItems).toHaveBeenCalledTimes(1);
    });

    it("should return null if item not found", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const item = await itemService.getItemById("2");

      expect(item).toBeNull();
      expect(readItems).toHaveBeenCalledTimes(1);
    });
  });

  describe("createItem", () => {
    it("should create a new item", async () => {
      const mockItem: Omit<Item, "id"> = {
        title: "Item 1",
        description: "Description 1",
        price: 10,
        category: "Category 1",
        isComplete: false,
      };
      const mockItems: Item[] = [];
      const newId = "new-id";
      (readItems as jest.Mock).mockResolvedValue(mockItems);
      (writeItems as jest.Mock).mockResolvedValue(undefined);
      (randomUUID as jest.Mock).mockReturnValue(newId);

      const newItem = await itemService.createItem(mockItem);

      expect(newItem).toEqual({ ...mockItem, id: newId });
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledWith([{ ...mockItem, id: newId }]);
    });
  });

  describe("updateItem", () => {
    it("should update an item", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      const updatedItemData: Partial<Item> = { title: "Updated Item 1" };
      (readItems as jest.Mock).mockResolvedValue(mockItems);
      (writeItems as jest.Mock).mockResolvedValue(undefined);

      const updatedItem = await itemService.updateItem("1", updatedItemData);

      expect(updatedItem).toEqual({ ...mockItems[0], ...updatedItemData });
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledWith([
        { ...mockItems[0], ...updatedItemData },
      ]);
    });

    it("should return null if item to update is not found", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const updatedItem = await itemService.updateItem("2", {
        title: "Updated Item",
      });

      expect(updatedItem).toBeNull();
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).not.toHaveBeenCalled();
    });
  });

  describe("deleteItem", () => {
    it("should delete an item", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);
      (writeItems as jest.Mock).mockResolvedValue(undefined);

      const result = await itemService.deleteItem("1");

      expect(result).toBe(true);
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledWith([]);
    });

    it("should return false if item to delete is not found", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const result = await itemService.deleteItem("2");

      expect(result).toBe(false);
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).not.toHaveBeenCalled();
    });
  });

  describe("toggleItemCompletion", () => {
    it("should toggle an item's completion status", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);
      (writeItems as jest.Mock).mockResolvedValue(undefined);

      const updatedItem = await itemService.toggleItemCompletion("1", true);

      expect(updatedItem).toEqual({ ...mockItems[0], isComplete: true });
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledTimes(1);
      expect(writeItems).toHaveBeenCalledWith([
        { ...mockItems[0], isComplete: true },
      ]);
    });

    it("should return null if item to toggle is not found", async () => {
      const mockItems: Item[] = [
        {
          id: "1",
          title: "Item 1",
          description: "Description 1",
          price: 10,
          category: "Category 1",
          isComplete: false,
        },
      ];
      (readItems as jest.Mock).mockResolvedValue(mockItems);

      const updatedItem = await itemService.toggleItemCompletion("2", true);

      expect(updatedItem).toBeNull();
      expect(readItems).toHaveBeenCalledTimes(1);
      expect(writeItems).not.toHaveBeenCalled();
    });
  });
});
