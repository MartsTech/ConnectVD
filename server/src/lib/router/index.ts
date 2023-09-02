import homeRouter from "@features/home/home-router";
import {type Express} from "express";

export default (app: Express): void => {
    app.use(homeRouter);
};