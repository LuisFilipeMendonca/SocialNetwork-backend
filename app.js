import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import usersRoutes from './src/routes/user';
import tokenRoutes from './src/routes/token';
import postRoutes from './src/routes/post';

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
    }
}

export default new App().app;