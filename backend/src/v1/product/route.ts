import express from 'express';
import * as productController from "./controller";

const router = express.Router();

router.post("/create", productController.createProduct );
router.get("/list", productController.listProducts );
router.put("/update/:id", productController.updateProduct );
router.delete("/delete/:id", productController.deleteProduct );

export default router;