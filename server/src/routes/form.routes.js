import express from "express";
import { postForm as postFormController } from "../controllers/form.controller.js";
const router = express.Router();
router.post('/',postFormController)
export default router;
