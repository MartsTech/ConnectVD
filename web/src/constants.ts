export const __prod__ = process.env.NODE_ENV === "production";
export const server_url = __prod__
  ? process.env.NEXT_APP_SERVER_KEY!
  : "http://localhost:8000/graphql";
