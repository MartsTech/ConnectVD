import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  stringifyVariables,
  subscriptionExchange,
} from "urql";
import { __prod__ } from "../constants";
import {
  AcceptFriendRequestMutationVariables,
  ChangeStatusMutation,
  DeclineFriendRequestMutationVariables,
  MeDocument,
  MeQuery,
  SignInMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "emails"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((field) => {
      const key = cache.resolve(entityKey, field.fieldKey) as string;
      const data = cache.resolve(key, "emails") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: "PaginatedEmails",
      hasMore,
      emails: results,
    };
  };
};

const invalidateAllFields = (
  fields: "friendRequests" | "friends" | "emails",
  cache: Cache
) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === fields);
  fieldInfos.forEach((field) => {
    cache.invalidate("Query", fields, field.arguments || {});
  });
};

const subscriptionClient = new SubscriptionClient(
  __prod__
    ? process.env.REACT_APP_WEB_SOCKET_KEY!
    : "ws://localhost:8000/subscriptions",
  {
    reconnect: true,
  }
);

export const client = createClient({
  url: __prod__
    ? process.env.REACT_APP_SERVER_KEY!
    : "http://localhost:8000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        User: () => null,
        PaginatedEmails: () => null,
      },
      resolvers: {
        Query: {
          emails: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
          signIn: (_result, _, cache, __) => {
            betterUpdateQuery<SignInMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, _) => ({
                me: result.signIn,
              })
            );
          },
          changeStatus: (_result, _, cache, __) => {
            betterUpdateQuery<ChangeStatusMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, __) => ({
                me: result.changeStatus,
              })
            );
          },
          acceptFriendRequest: (_, args, cache, __) => {
            cache.invalidate({
              __typename: "Friend",
              id: (args as AcceptFriendRequestMutationVariables).email,
            });
          },
          declineFriendRequest: (_, args, cache, __) => {
            cache.invalidate({
              __typename: "Friend",
              id: (args as DeclineFriendRequestMutationVariables).email,
            });
          },
          sendEmail: (_, __, cache, ___) => {
            invalidateAllFields("emails", cache);
          },
        },
        Subscription: {
          newFriendRequst: (_, __, cache, ___) => {
            invalidateAllFields("friendRequests", cache);
          },
          newFriend: (_, __, cache, ___) => {
            invalidateAllFields("friends", cache);
          },
          newEmail: (_, __, cache, ___) => {
            invalidateAllFields("emails", cache);
          },
        },
      },
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});
