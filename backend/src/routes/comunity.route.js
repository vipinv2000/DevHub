import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCommunity, joinCommunity ,listComunity,communityGroupForSideBar,sendCommunityMessage} from "../controllers/comunity.controller.js";

const router = express.Router();

router.post("/createCommunity", protectRoute,createCommunity);
router.get("/joinCommunity/:comunityId", protectRoute,joinCommunity);
router.get("/listComunity", protectRoute,listComunity);
router.get("/communityGroup", protectRoute, communityGroupForSideBar);
router.post("/sendCommunityMessage/:cumId", protectRoute, sendCommunityMessage);

export default router;
