import { Router } from "express";

import followerController from "../controllers/Follower";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired, followerController.post);
router.get("/", loginRequired, followerController.getFollowers);

export default router;
