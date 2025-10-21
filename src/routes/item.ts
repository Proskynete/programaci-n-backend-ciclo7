import { Router } from "express";

import { ItemController } from "../controllers/item";

const router = Router();

router.get("/", ItemController.GetAllItems);
router.get("/:id", ItemController.GetItemById);
router.post("/", ItemController.CreateItem);
router.put("/:id", ItemController.UpdateItem);
router.delete("/:id", ItemController.DeleteItem);
router.patch("/:id/toggle", ItemController.ToggleItemCompletion);

export { router };
