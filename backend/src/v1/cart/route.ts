import express from 'express';
import * as cartController from "./controller";

const router = express.Router();

router.post("/create", cartController.createCart);
router.get("/list", cartController.listCarts);
router.get("/user/:userId", cartController.getCartByUserId);
// router.get("/user/:userId/products", cartController.userAllProduct);
// router.get("/:cartId/product/:productId", cartController.singleProduct);
router.put("/update/:id", cartController.updateCart);

export default router;