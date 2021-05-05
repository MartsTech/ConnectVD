export const __prod__ = process.env.NODE_ENV === "production";

export const server_url = __prod__
  ? process.env.NEXT_PUBLIC_SUBS_URL
  : "http://localhost:8000";

export const graphql_url = __prod__
  ? process.env.NEXT_PUBLIC_GRAPHQL_URL
  : "http://localhost:8000/graphql";

export const subs_url = __prod__
  ? process.env.NEXT_PUBLIC_SUBS_URL
  : "ws://localhost:8000/subscriptions";
