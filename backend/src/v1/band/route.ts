import express from 'express';
import * as bandController from "./controller";

const router = express.Router();

router.post("/create", bandController.createBand);
router.get("/list", bandController.listBands);
router.put("/update/:id", bandController.updateBand);
router.delete("/delete/:id", bandController.deleteBand);

export default router;