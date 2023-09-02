import app from "./app";
import "dotenv/config";

const port: number = Number(process.env.PORT);

app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
});