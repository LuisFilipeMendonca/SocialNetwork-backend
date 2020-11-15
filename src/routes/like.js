import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";

import likeController from "../controllers/Like";

const router = new Router();

router.post("/", loginRequired, likeController.postLike);
router.delete("/:postId", loginRequired, likeController.deleteLike);

export default router;
