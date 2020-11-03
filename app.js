import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import usersRoutes from './src/routes/user';
import tokenRoutes from './src/routes/token';
import postRoutes from './src/routes/post';
import commentRoutes from './src/routes/comment';
import likeRoutes from './src/routes/like';

class App {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/users', usersRoutes);
        this.app.use('/token', tokenRoutes);
        this.app.use('/posts', postRoutes);
        this.app.use('/comments', commentRoutes);
        this.app.use('/likes', likeRoutes);
    }
}

export default new App().app;