import {type IRouter, type Request, type Response, Router} from "express";

const router: IRouter = Router();

router.get('/', (_req: Request, res: Response): void => {
    res.send('Hello, Express API with TypeScript!');
});

export default router;