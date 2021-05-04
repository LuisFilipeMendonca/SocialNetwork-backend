import { Router } from "express";

import commentController from "../controllers/Comment";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", commentController.postComment);
router.get("/:postId", loginRequired, commentController.getPostComments);

export default router;
