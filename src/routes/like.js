import { Router } from 'express';

import likeController from '../controllers/Like';

const router = new Router();

router.post('/', likeController.postLike);

export default router;