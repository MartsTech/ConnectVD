import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  friends: Array<Friend>;
  friendRequests: Array<Friend>;
  rooms: Array<Room>;
  me?: Maybe<User>;
};

export type QueryRoomsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type Friend = {
  __typename?: "Friend";
  user: User;
  createdAt: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  displayName: Scalars["String"];
  photoUrl: Scalars["String"];
  status: Scalars["String"];
};

export type Room = {
  __typename?: "Room";
  id: Scalars["String"];
  createdAt: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createFriendRequest: RequestResponse;
  acceptFriendRequest: RequestResponse;
  declineFriendRequest: Scalars["Boolean"];
  createRoom: Scalars["String"];
  joinRoom: JoinRoomRes;
  signIn: User;
  signOut: Scalars["Boolean"];
  changeStatus: Scalars["String"];
};

export type MutationCreateFriendRequestArgs = {
  email: Scalars["String"];
};

export type MutationAcceptFriendRequestArgs = {
  email: Scalars["String"];
};

export type MutationDeclineFriendRequestArgs = {
  email: Scalars["String"];
};

export type MutationJoinRoomArgs = {
  input: JoinRoomInput;
};

export type MutationSignInArgs = {
  options: SignInOptionsInput;
};

export type MutationChangeStatusArgs = {
  status: Scalars["String"];
};

export type RequestResponse = {
  __typename?: "RequestResponse";
  message: Scalars["String"];
  status: Scalars["String"];
};

export type JoinRoomRes = {
  __typename?: "JoinRoomRes";
  users?: Maybe<Array<Scalars["String"]>>;
  error?: Maybe<Scalars["String"]>;
};

export type JoinRoomInput = {
  roomId: Scalars["String"];
  socketId: Scalars["String"];
};

export type SignInOptionsInput = {
  id: Scalars["String"];
  email: Scalars["String"];
  displayName: Scalars["String"];
  photoUrl?: Maybe<Scalars["String"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  newFriendRequst: Friend;
  newFriend: Friend;
};

export type AcceptFriendRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type AcceptFriendRequestMutation = { __typename?: "Mutation" } & {
  acceptFriendRequest: { __typename?: "RequestResponse" } & Pick<
    RequestResponse,
    "message" | "status"
  >;
};

export type ChangeStatusMutationVariables = Exact<{
  status: Scalars["String"];
}>;

export type ChangeStatusMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "changeStatus"
>;

export type CreateFriendRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type CreateFriendRequestMutation = { __typename?: "Mutation" } & {
  createFriendRequest: { __typename?: "RequestResponse" } & Pick<
    RequestResponse,
    "message" | "status"
  >;
};

export type CreateRoomMutationVariables = Exact<{ [key: string]: never }>;

export type CreateRoomMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createRoom"
>;

export type DeclineFriendRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type DeclineFriendRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "declineFriendRequest"
>;

export type JoinRoomMutationVariables = Exact<{
  input: JoinRoomInput;
}>;

export type JoinRoomMutation = { __typename?: "Mutation" } & {
  joinRoom: { __typename?: "JoinRoomRes" } & Pick<
    JoinRoomRes,
    "users" | "error"
  >;
};

export type SignInMutationVariables = Exact<{
  options: SignInOptionsInput;
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
  signIn: { __typename?: "User" } & Pick<
    User,
    "email" | "displayName" | "photoUrl" | "status"
  >;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signOut"
>;

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never }>;

export type FriendRequestsQuery = { __typename?: "Query" } & {
  friendRequests: Array<
    { __typename?: "Friend" } & Pick<Friend, "createdAt"> & {
        user: { __typename?: "User" } & Pick<
          User,
          "email" | "displayName" | "photoUrl" | "status"
        >;
      }
  >;
};

export type FriendsQueryVariables = Exact<{ [key: string]: never }>;

export type FriendsQuery = { __typename?: "Query" } & {
  friends: Array<
    { __typename?: "Friend" } & Pick<Friend, "createdAt"> & {
        user: { __typename?: "User" } & Pick<
          User,
          "email" | "displayName" | "photoUrl" | "status"
        >;
      }
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "email" | "displayName" | "photoUrl" | "status"
    >
  >;
};

export type NewFriendSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewFriendSubscription = { __typename?: "Subscription" } & {
  newFriend: { __typename?: "Friend" } & Pick<Friend, "createdAt"> & {
      user: { __typename?: "User" } & Pick<
        User,
        "email" | "displayName" | "photoUrl" | "status"
      >;
    };
};

export type NewFriendRequstSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type NewFriendRequstSubscription = { __typename?: "Subscription" } & {
  newFriendRequst: { __typename?: "Friend" } & Pick<Friend, "createdAt"> & {
      user: { __typename?: "User" } & Pick<
        User,
        "email" | "displayName" | "photoUrl" | "status"
      >;
    };
};

export const AcceptFriendRequestDocument = gql`
  mutation AcceptFriendRequest($email: String!) {
    acceptFriendRequest(email: $email) {
      message
      status
    }
  }
`;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<
  AcceptFriendRequestMutation,
  AcceptFriendRequestMutationVariables
>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >
) {
  return Apollo.useMutation<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >(AcceptFriendRequestDocument, baseOptions);
}
export type AcceptFriendRequestMutationHookResult = ReturnType<
  typeof useAcceptFriendRequestMutation
>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  AcceptFriendRequestMutation,
  AcceptFriendRequestMutationVariables
>;
export const ChangeStatusDocument = gql`
  mutation ChangeStatus($status: String!) {
    changeStatus(status: $status)
  }
`;
export type ChangeStatusMutationFn = Apollo.MutationFunction<
  ChangeStatusMutation,
  ChangeStatusMutationVariables
>;

/**
 * __useChangeStatusMutation__
 *
 * To run a mutation, you first call `useChangeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStatusMutation, { data, loading, error }] = useChangeStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeStatusMutation,
    ChangeStatusMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangeStatusMutation,
    ChangeStatusMutationVariables
  >(ChangeStatusDocument, baseOptions);
}
export type ChangeStatusMutationHookResult = ReturnType<
  typeof useChangeStatusMutation
>;
export type ChangeStatusMutationResult = Apollo.MutationResult<ChangeStatusMutation>;
export type ChangeStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeStatusMutation,
  ChangeStatusMutationVariables
>;
export const CreateFriendRequestDocument = gql`
  mutation CreateFriendRequest($email: String!) {
    createFriendRequest(email: $email) {
      message
      status
    }
  }
`;
export type CreateFriendRequestMutationFn = Apollo.MutationFunction<
  CreateFriendRequestMutation,
  CreateFriendRequestMutationVariables
>;

/**
 * __useCreateFriendRequestMutation__
 *
 * To run a mutation, you first call `useCreateFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFriendRequestMutation, { data, loading, error }] = useCreateFriendRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFriendRequestMutation,
    CreateFriendRequestMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateFriendRequestMutation,
    CreateFriendRequestMutationVariables
  >(CreateFriendRequestDocument, baseOptions);
}
export type CreateFriendRequestMutationHookResult = ReturnType<
  typeof useCreateFriendRequestMutation
>;
export type CreateFriendRequestMutationResult = Apollo.MutationResult<CreateFriendRequestMutation>;
export type CreateFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateFriendRequestMutation,
  CreateFriendRequestMutationVariables
>;
export const CreateRoomDocument = gql`
  mutation CreateRoom {
    createRoom
  }
`;
export type CreateRoomMutationFn = Apollo.MutationFunction<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >
) {
  return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument,
    baseOptions
  );
}
export type CreateRoomMutationHookResult = ReturnType<
  typeof useCreateRoomMutation
>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<
  CreateRoomMutation,
  CreateRoomMutationVariables
>;
export const DeclineFriendRequestDocument = gql`
  mutation DeclineFriendRequest($email: String!) {
    declineFriendRequest(email: $email)
  }
`;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<
  DeclineFriendRequestMutation,
  DeclineFriendRequestMutationVariables
>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >
) {
  return Apollo.useMutation<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >(DeclineFriendRequestDocument, baseOptions);
}
export type DeclineFriendRequestMutationHookResult = ReturnType<
  typeof useDeclineFriendRequestMutation
>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<
  DeclineFriendRequestMutation,
  DeclineFriendRequestMutationVariables
>;
export const JoinRoomDocument = gql`
  mutation JoinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      users
      error
    }
  }
`;
export type JoinRoomMutationFn = Apollo.MutationFunction<
  JoinRoomMutation,
  JoinRoomMutationVariables
>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinRoomMutation,
    JoinRoomMutationVariables
  >
) {
  return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(
    JoinRoomDocument,
    baseOptions
  );
}
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<
  JoinRoomMutation,
  JoinRoomMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($options: SignInOptionsInput!) {
    signIn(options: $options) {
      email
      displayName
      photoUrl
      status
    }
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    baseOptions
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    baseOptions
  );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
export const FriendRequestsDocument = gql`
  query FriendRequests {
    friendRequests {
      createdAt
      user {
        email
        displayName
        photoUrl
        status
      }
    }
  }
`;

/**
 * __useFriendRequestsQuery__
 *
 * To run a query within a React component, call `useFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FriendRequestsQuery,
    FriendRequestsQueryVariables
  >
) {
  return Apollo.useQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(
    FriendRequestsDocument,
    baseOptions
  );
}
export function useFriendRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FriendRequestsQuery,
    FriendRequestsQueryVariables
  >
) {
  return Apollo.useLazyQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(
    FriendRequestsDocument,
    baseOptions
  );
}
export type FriendRequestsQueryHookResult = ReturnType<
  typeof useFriendRequestsQuery
>;
export type FriendRequestsLazyQueryHookResult = ReturnType<
  typeof useFriendRequestsLazyQuery
>;
export type FriendRequestsQueryResult = Apollo.QueryResult<
  FriendRequestsQuery,
  FriendRequestsQueryVariables
>;
export const FriendsDocument = gql`
  query Friends {
    friends {
      createdAt
      user {
        email
        displayName
        photoUrl
        status
      }
    }
  }
`;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(
  baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>
) {
  return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(
    FriendsDocument,
    baseOptions
  );
}
export function useFriendsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>
) {
  return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(
    FriendsDocument,
    baseOptions
  );
}
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<
  FriendsQuery,
  FriendsQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      email
      displayName
      photoUrl
      status
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewFriendDocument = gql`
  subscription NewFriend {
    newFriend {
      createdAt
      user {
        email
        displayName
        photoUrl
        status
      }
    }
  }
`;

/**
 * __useNewFriendSubscription__
 *
 * To run a query within a React component, call `useNewFriendSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NewFriendSubscription,
    NewFriendSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    NewFriendSubscription,
    NewFriendSubscriptionVariables
  >(NewFriendDocument, baseOptions);
}
export type NewFriendSubscriptionHookResult = ReturnType<
  typeof useNewFriendSubscription
>;
export type NewFriendSubscriptionResult = Apollo.SubscriptionResult<NewFriendSubscription>;
export const NewFriendRequstDocument = gql`
  subscription NewFriendRequst {
    newFriendRequst {
      createdAt
      user {
        email
        displayName
        photoUrl
        status
      }
    }
  }
`;

/**
 * __useNewFriendRequstSubscription__
 *
 * To run a query within a React component, call `useNewFriendRequstSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewFriendRequstSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFriendRequstSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewFriendRequstSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    NewFriendRequstSubscription,
    NewFriendRequstSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    NewFriendRequstSubscription,
    NewFriendRequstSubscriptionVariables
  >(NewFriendRequstDocument, baseOptions);
}
export type NewFriendRequstSubscriptionHookResult = ReturnType<
  typeof useNewFriendRequstSubscription
>;
export type NewFriendRequstSubscriptionResult = Apollo.SubscriptionResult<NewFriendRequstSubscription>;
