declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    MONGO_URL: string;
    MONGO_SECRET: string;
  }
}
