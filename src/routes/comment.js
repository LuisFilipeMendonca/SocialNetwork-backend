import { Router } from "express";

import commentController from "../controllers/Comment";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, commentController.postComment);

export default router;
