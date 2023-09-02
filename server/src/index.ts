import express, {type Express, type Request, type Response} from 'express';
import "dotenv/config";

const app: Express = express();
const port: number = Number(process.env.PORT);

app.get('/', (_req: Request, res: Response): void => {
    res.send('Hello, Express API with TypeScript!');
});

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
});
