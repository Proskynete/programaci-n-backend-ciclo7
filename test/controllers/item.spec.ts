import request from "supertest";

import app from "../../src/app";
import { EStatusCode } from "../../src/models/status_code";
import { ItemService } from "../../src/services/item";
import mockData from "../__mocks__/item.response.json";

jest.mock("../../src/services/item", () => {
  const mItemService = {
    getAllItems: jest.fn(),
    getItemById: jest.fn(),
    createItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
  };
  return {
    ItemService: jest.fn(() => mItemService),
  };
});

describe("/api/v1/item", () => {
  const url = "/api/v1/item";
  let itemService: jest.Mocked<ItemService>;

  beforeEach(() => {
    itemService = new ItemService() as jest.Mocked<ItemService>;
  });

  describe("GET: /", () => {
    test("should return 200 OK", async () => {
      itemService.getAllItems.mockResolvedValue(mockData);
      const response = await request(app).get(url);
      expect(response.statusCode).toEqual(EStatusCode.OK);
      expect(response.body).toEqual(mockData);
    });

    test("should return 204 No Content", async () => {
      itemService.getAllItems.mockResolvedValue([]);
      const response = await request(app).get(url);
      expect(response.statusCode).toEqual(EStatusCode.OK);
    });
  });

  describe("GET: /:id", () => {
    test("should return 200 OK", async () => {
      itemService.getItemById.mockResolvedValue(mockData[0]);
      const response = await request(app).get(`${url}/1`);
      expect(response.statusCode).toEqual(EStatusCode.OK);
      expect(response.body).toEqual(mockData[0]);
    });

    test("should return 404 Not Found", async () => {
      itemService.getItemById.mockResolvedValue(null);
      const response = await request(app).get(`${url}/1`);
      expect(response.statusCode).toEqual(EStatusCode.NOT_FOUND);
    });
  });

  describe("POST: /", () => {
    test("should return 201 Created", async () => {
      itemService.createItem.mockResolvedValue(mockData[0]);
      const response = await request(app).post(url).send(mockData[0]);
      expect(response.statusCode).toEqual(EStatusCode.CREATED);
      expect(response.body).toEqual(mockData[0]);
    });
  });

  describe("PUT: /:id", () => {
    test("should return 200 OK", async () => {
      itemService.updateItem.mockResolvedValue(mockData[0]);
      const response = await request(app).put(`${url}/1`).send(mockData[0]);
      expect(response.statusCode).toEqual(EStatusCode.OK);
      expect(response.body).toEqual(mockData[0]);
    });

    test("should return 404 Not Found", async () => {
      itemService.updateItem.mockResolvedValue(null);
      const response = await request(app).put(`${url}/1`).send({});
      expect(response.statusCode).toEqual(EStatusCode.NOT_FOUND);
    });
  });

  describe("DELETE: /:id", () => {
    test("should return 204 No Content", async () => {
      itemService.deleteItem.mockResolvedValue(true);
      const response = await request(app).delete(`${url}/1`);
      expect(response.statusCode).toEqual(EStatusCode.NO_CONTENT);
    });

    test("should return 404 Not Found", async () => {
      itemService.deleteItem.mockResolvedValue(false);
      const response = await request(app).delete(`${url}/1`);
      expect(response.statusCode).toEqual(EStatusCode.NOT_FOUND);
    });
  });
});
