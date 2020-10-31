import express from 'express';

import './src/database';

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

    routes() {}
}

export default new App().app;