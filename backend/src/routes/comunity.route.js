import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCommunity, joinCommunity } from "../controllers/comunity.controller.js";

const router = express.Router();

router.get("/createCommunity", protectRoute,createCommunity);
router.get("/joinCommunity/:comunityId", protectRoute,joinCommunity);


export default router;
