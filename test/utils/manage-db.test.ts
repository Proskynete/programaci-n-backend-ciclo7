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
    it("should return an array of items if db.json exists", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
        },
      ];
      const data = JSON.stringify(items);
      mockedFs.readFile.mockResolvedValue(data);

      const result = await readItems();
      expect(result).toEqual(items);
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        expect.any(String),
        "utf-8"
      );
    });

    it("should return an empty array if db.json does not exist", async () => {
      const error = new Error("File not found") as NodeJS.ErrnoException;
      error.code = "ENOENT";
      mockedFs.readFile.mockRejectedValue(error);

      const result = await readItems();
      expect(result).toEqual([]);
    });

    it("should throw an error for other read errors", async () => {
      const error = new Error("Read error");
      mockedFs.readFile.mockRejectedValue(error);

      await expect(readItems()).rejects.toThrow("Read error");
    });

    it("should throw an error if db.json contains invalid JSON", async () => {
      const invalidData = "this is not json";
      mockedFs.readFile.mockResolvedValue(invalidData);

      await expect(readItems()).rejects.toThrow(SyntaxError);
    });
  });

  describe("writeItems", () => {
    it("should write items to db.json", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
        },
      ];
      mockedFs.writeFile.mockResolvedValue(undefined);

      await writeItems(items);

      expect(mockedFs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(items, null, 2)
      );
    });

    it("should throw an error if writing to db.json fails", async () => {
      const items: Item[] = [
        {
          id: "1",
          title: "Test Item",
          category: "Test",
          description: "Test Description",
          price: 10,
        },
      ];
      const error = new Error("Write error");
      mockedFs.writeFile.mockRejectedValue(error);

      await expect(writeItems(items)).rejects.toThrow("Write error");
    });
  });
});
