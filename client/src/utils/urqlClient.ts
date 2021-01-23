import { cacheExchange } from "@urql/exchange-graphcache";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import {
  AcceptFriendRequestMutationVariables,
  ChangeStatusMutation,
  DeclineFriendRequestMutationVariables,
  FriendRequestsDocument,
  FriendRequestsQuery,
  FriendsDocument,
  FriendsQuery,
  MeDocument,
  MeQuery,
  NewFriendRequstSubscription,
  NewFriendSubscription,
  SignInMutation,
  SignOutMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:8000/subscriptions",
  {
    reconnect: true,
  }
);

export const client = createClient({
  url: "http://localhost:8000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        User: () => null,
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
          signOut: (_result, _, cache, __) => {
            betterUpdateQuery<SignOutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (_, __) => ({
                me: null,
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
        },
        Subscription: {
          newFriendRequst: (_result, _, cache, __) => {
            betterUpdateQuery<NewFriendRequstSubscription, FriendRequestsQuery>(
              cache,
              { query: FriendRequestsDocument },
              _result,
              (result, query) => ({
                friendRequests: [
                  ...(query.friendRequests as any),
                  result.newFriendRequst as any,
                ],
              })
            );
          },
          newFriend: (_result, _, cache, __) => {
            betterUpdateQuery<NewFriendSubscription, FriendsQuery>(
              cache,
              { query: FriendsDocument },
              _result,
              (result, query) => ({
                friends: [...(query.friends as any), result.newFriend as any],
              })
            );
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
