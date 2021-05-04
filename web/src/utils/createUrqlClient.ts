import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  dedupExchange,
  fetchExchange,
  stringifyVariables,
  subscriptionExchange,
} from "urql";
import { server_url, __prod__ } from "../configs/constants";
import {
  AcceptFriendRequestMutationVariables,
  ChangeStatusMutation,
  ChangeStatusMutationVariables,
  DeclineFriendRequestMutationVariables,
  MeDocument,
  MeQuery,
  SignInMutation,
  SignInMutationVariables,
} from "generated/graphql";
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
  fields: "friendRequests" | "friends" | "emails" | "invites",
  cache: Cache
) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === fields);
  fieldInfos.forEach((field) => {
    cache.invalidate("Query", fields, field.arguments || {});
  });
};

const subscriptionClient = process.browser
  ? new SubscriptionClient(
      __prod__
        ? process.env.REACT_APP_WEB_SOCKET_KEY!
        : "ws://localhost:8000/subscriptions",
      {
        reconnect: true,
      }
    )
  : null;

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  return {
    url: server_url,
    fetchOptions: {
      credentials: "include" as const,
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
            signIn: (_result, args, cache, _) => {
              betterUpdateQuery<SignInMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                  variables: {
                    uid: (args as SignInMutationVariables).options.id,
                  },
                },
                _result,
                (result, _) => ({
                  me: result.signIn,
                })
              );
            },
            changeStatus: (_result, args, cache, _) => {
              betterUpdateQuery<ChangeStatusMutation, MeQuery>(
                cache,
                {
                  query: MeDocument,
                  variables: {
                    uid: (args as ChangeStatusMutationVariables).uid,
                  },
                },
                _result,
                (result, __) => ({
                  me: result.changeStatus,
                })
              );
            },
            acceptFriendRequest: (_, __, cache, ___) => {
              invalidateAllFields("friendRequests", cache);
            },
            acceptInvite: (_, args, cache, __) => {
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
            declineInvite: (_, args, cache, __) => {
              cache.invalidate({
                __typename: "Friend",
                id: (args as DeclineFriendRequestMutationVariables).email,
              });
            },
            sendEmail: (_, __, cache, ___) => {
              invalidateAllFields("emails", cache);
            },
            unfriend: (_, args, cache, __) => {
              cache.invalidate({
                __typename: "Friend",
                id: (args as DeclineFriendRequestMutationVariables).email,
              });
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
            newInvite: (_, __, cache, ___) => {
              invalidateAllFields("invites", cache);
            },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient?.request(operation) as any;
        },
      }),
    ],
  };
};
