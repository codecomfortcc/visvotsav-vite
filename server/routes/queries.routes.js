
import express from "express";
import { postQuery } from "../controllers/queries.controller.js";

const router= new express.Router();
router.post('/',postQuery)
export default router
