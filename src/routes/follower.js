import { Router } from "express";

import followerController from "../controllers/Follower";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired, followerController.postFollower);
router.delete("/:followerId", loginRequired, followerController.deleteFollower);

export default router;
