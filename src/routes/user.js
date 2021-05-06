import { Router } from "express";

import userController from "../controllers/User";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.get("/:userId", loginRequired, userController.getUser);

export default router;
