import express from 'express';
import * as cartController from "./controller";

const router = express.Router();

router.post("/create", cartController.createCart);
router.get("/list", cartController.listCarts);
router.put("/update/:id", cartController.updateCart);

export default router;