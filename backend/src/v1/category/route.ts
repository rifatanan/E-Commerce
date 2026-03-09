import express from 'express';
import * as categoryController from "./controller";

const router = express.Router();

router.post("/create", categoryController.createCategory );
router.get("/list", categoryController.listCategories );
router.put("/update/:id", categoryController.updateCategory );
router.delete("/delete/:id", categoryController.deleteCategory );

export default router;