import { Router } from 'express';

import userController from '../controllers/User';

const router = new Router();

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

export default router;