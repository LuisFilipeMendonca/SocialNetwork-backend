import { Router } from 'express';

import commentController from '../controllers/Comment';

const router = new Router();

router.post('/', commentController.postComment);

export default router;