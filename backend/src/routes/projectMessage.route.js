import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getGroupsForSidebar, sendProjectMessage ,getProjectMessages,CodeSubmission} from "../controllers/projectMessage.controller.js";
const router = express.Router();

router.get("/projectGroup", protectRoute, getGroupsForSidebar);
router.post("/sendProjectMessage/:projectId", protectRoute, sendProjectMessage);
router.get("/getProjectMessages/:projectId", protectRoute, getProjectMessages);
router.post("/CodeSubmission/:projectId", protectRoute, CodeSubmission);

export default router;
