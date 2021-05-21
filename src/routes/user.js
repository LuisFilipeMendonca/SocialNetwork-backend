import { Router } from "express";

import userController from "../controllers/User";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", userController.createUser);
router.put("/", loginRequired, userController.updateUser);
router.get("/:userId", loginRequired, userController.getUser);
router.get("/search/:username", loginRequired, userController.searchUser);
router.delete("/:userId", loginRequired, userController.deleteUser);

export default router;
