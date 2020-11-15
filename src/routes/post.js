import { Router } from "express";
import loginRequired from "../middlewares/loginRequired";

import postController from "../controllers/Post";

const router = new Router();

router.post("/", postController.createPost);
router.get("/", loginRequired, postController.getPosts);
router.get("/:id", postController.getPost);
router.delete("/:id", postController.deletePost);

export default router;
