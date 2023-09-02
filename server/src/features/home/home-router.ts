import {type IRouter, type Request, type Response, Router} from "express";

const router: IRouter = Router();

/**
 * @swagger
 * /:
 *   get:
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/', (_req: Request, res: Response): void => {
    res.send('Hello, Express API with TypeScript!');
});

export default router;