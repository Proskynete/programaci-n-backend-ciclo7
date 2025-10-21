import { removeExtensions } from "../../src/utils/remove_extensions";

describe("Testing remove extensions", () => {
  it("should remove the extension of a file", () => {
    const file = "example.txt";
    const result = removeExtensions(file);
    expect(result).toBe("example");
  });
});
