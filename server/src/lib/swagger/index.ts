import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger-docs";
import {type Express} from "express";

export default (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};