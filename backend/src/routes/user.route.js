import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";


import {
    acceptFollowRequest, addpost, getFeedPosts, getPendingRequests, requestFollow,
    getDevelopers, searchtecStack, addStory, getStory, getDeveloperProfile,
    getAccountInteractions, getfollowingDevelopers, getfollowers, DoPostLike,
    addProject, getProjectList, sendInterestRequest, InterestRequestReject, InterestRequestAccept,
    ownerMyProjects
} from "../controllers/user.controller.js";





const router = express.Router();




router.post("/addpost", protectRoute, addpost);
router.post("/addStory", protectRoute, addStory);
router.patch("/requestFollow/:id/:type", protectRoute, requestFollow);
router.get("/getPendingRequests", protectRoute, getPendingRequests);
router.patch("/acceptFollowRequest/:id/:type", protectRoute, acceptFollowRequest);
router.get("/getFeedPosts", protectRoute, getFeedPosts);
router.get("/getStory", protectRoute, getStory);



router.get("/getDevelopers", protectRoute, getDevelopers)
router.get("/searchtecStack/:searchkey", searchtecStack)
router.get("/getDeveloperProfile/:devId", protectRoute, getDeveloperProfile)
router.get("/getAccountInteractions", protectRoute, getAccountInteractions)

router.get("/getfollowingDevelopers/:id", protectRoute, getfollowingDevelopers)
router.get("/getfollowers/:id", protectRoute, getfollowers)

router.get("/DoPostLike/:postId/:collectionId", protectRoute, DoPostLike)


//new

router.post("/addProject", protectRoute, addProject)
router.get("/getProjectList", protectRoute, getProjectList)
router.get("/sendInterestRequest/:projectId", protectRoute, sendInterestRequest)
router.get("/InterestRequestReject/:devId/:projectId", protectRoute, InterestRequestReject)
router.get("/InterestRequestAccept/:devId/:projectId", protectRoute, InterestRequestAccept)
router.get("/ownerMyProjects",protectRoute,ownerMyProjects)

//router.get('/getJobPostOnly',protectRoute);



export default router;
