import express, {type Express} from 'express';
import swagger from "@lib/swagger";
import router from "@lib/router";

const app: Express = express();

swagger(app);
router(app);

export default app;