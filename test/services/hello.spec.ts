import { ItemService } from "../../src/services/item";
import mockResponse from "../__mocks__/hello.response.json";

describe("ItemService", () => {
  test("should return 'Hello World!'", async () => {
    const result = await ItemService();
    expect(result).toEqual(mockResponse);
  });
});
