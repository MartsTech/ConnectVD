import app from "./app";
import db from "@lib/db";
import "dotenv/config";

const start = async (): Promise<void> => {
    console.log('Starting server');

    const port: number = Number(process.env.PORT);

    try {
        db.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error(error);
    }

    app.listen(port, (): void => {
        console.log(`Server is running on port ${port}`);
    });
};

start();
