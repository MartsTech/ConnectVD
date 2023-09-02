import express, {type Express} from 'express';
import homeRouter from "@features/home/home-router";

const app: Express = express();

app.use(homeRouter);

export default app;