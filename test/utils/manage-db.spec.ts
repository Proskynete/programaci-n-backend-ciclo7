import fs from "fs/promises";

import { Item } from "../../src/models/business/item";
import { readItems, writeItems } from "../../src/utils/manage-db";

jest.mock("fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("Database Management", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("readItems", () => {
    it("should read and parse db.json returning an array of items", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
          isComplete: false,
        },
      ];
      const data = JSON.stringify(items);
      mockedFs.readFile.mockResolvedValue(data);

      const result = await readItems();
      expect(result).toEqual(items);
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("db.json"),
        "utf-8"
      );
    });

    it("should return an empty array if db.json is empty", async () => {
      const data = JSON.stringify([]);
      mockedFs.readFile.mockResolvedValue(data);

      const result = await readItems();
      expect(result).toEqual([]);
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("db.json"),
        "utf-8"
      );
    });

    it("should return an empty array when db.json does not exist (ENOENT)", async () => {
      const error = new Error("File not found") as NodeJS.ErrnoException;
      error.code = "ENOENT";
      mockedFs.readFile.mockRejectedValue(error);

      const result = await readItems();
      expect(result).toEqual([]);
    });

    it("should re-throw errors that are not ENOENT from readFile", async () => {
      const error = new Error("Read error");
      mockedFs.readFile.mockRejectedValue(error);

      await expect(readItems()).rejects.toThrow("Read error");
    });

    it("should throw a SyntaxError for invalid JSON", async () => {
      const invalidData = "this is not json";
      mockedFs.readFile.mockResolvedValue(invalidData);

      await expect(readItems()).rejects.toThrow(SyntaxError);
    });
  });

  describe("writeItems", () => {
    it("should stringify and write items to db.json", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
          isComplete: false,
        },
      ];
      mockedFs.writeFile.mockResolvedValue(undefined);

      await writeItems(items);

      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining("db.json"),
        JSON.stringify(items, null, 2)
      );
    });

    it("should write an empty array to db.json", async () => {
      const items: Item[] = [];
      mockedFs.writeFile.mockResolvedValue(undefined);

      await writeItems(items);

      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining("db.json"),
        JSON.stringify(items, null, 2)
      );
    });

    it("should throw an error if writeFile fails", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
          isComplete: false,
        },
      ];
      const error = new Error("Write error");
      mockedFs.writeFile.mockRejectedValue(error);

      await expect(writeItems(items)).rejects.toThrow("Write error");
    });
  });
});
