import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";

import postController from "../controllers/Post";

const router = new Router();

router.post("/", loginRequired, postController.createPost);
router.get("/following", loginRequired, postController.getFollowingPosts);
router.get("/", loginRequired, postController.getPosts);
router.get("/:id", loginRequired, postController.getPost);
router.delete("/:id", postController.deletePost);

export default router;
