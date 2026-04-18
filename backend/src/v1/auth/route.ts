import express from 'express';
import * as userController from "./controller";
import { registerSchema, loginSchema } from '../../zod/zodValidation';
import { validateRequest } from "../../middleware/validateRequest";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), userController.register );
router.post("/login", validateRequest(loginSchema), userController.login );

export default router;