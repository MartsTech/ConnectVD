import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  rooms: Array<Room>;
  usersInRoom: Array<User>;
};


export type QueryRoomsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUsersInRoomArgs = {
  roomId: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  createdAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  socketId: Scalars['String'];
  roomId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Room;
  deleteRoom: Scalars['Boolean'];
  joinRoom: User;
  leaveRoom: Scalars['Boolean'];
};


export type MutationDeleteRoomArgs = {
  roomId: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  socketId: Scalars['String'];
  roomId: Scalars['String'];
};


export type MutationLeaveRoomArgs = {
  socketId: Scalars['String'];
};

export type CreateRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'createdAt'>
  ) }
);

export type JoinRoomMutationVariables = Exact<{
  roomId: Scalars['String'];
  socketId: Scalars['String'];
}>;


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename?: 'User' }
    & Pick<User, 'roomId' | 'socketId'>
  ) }
);

export type UsersInRoomQueryVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type UsersInRoomQuery = (
  { __typename?: 'Query' }
  & { usersInRoom: Array<(
    { __typename?: 'User' }
    & Pick<User, 'socketId'>
  )> }
);


export const CreateRoomDocument = gql`
    mutation CreateRoom {
  createRoom {
    id
    createdAt
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

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
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const JoinRoomDocument = gql`
    mutation JoinRoom($roomId: String!, $socketId: String!) {
  joinRoom(roomId: $roomId, socketId: $socketId) {
    roomId
    socketId
  }
}
    `;
export type JoinRoomMutationFn = Apollo.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

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
 *      roomId: // value for 'roomId'
 *      socketId: // value for 'socketId'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, baseOptions);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;
export const UsersInRoomDocument = gql`
    query UsersInRoom($roomId: String!) {
  usersInRoom(roomId: $roomId) {
    socketId
  }
}
    `;

/**
 * __useUsersInRoomQuery__
 *
 * To run a query within a React component, call `useUsersInRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersInRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersInRoomQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useUsersInRoomQuery(baseOptions: Apollo.QueryHookOptions<UsersInRoomQuery, UsersInRoomQueryVariables>) {
        return Apollo.useQuery<UsersInRoomQuery, UsersInRoomQueryVariables>(UsersInRoomDocument, baseOptions);
      }
export function useUsersInRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersInRoomQuery, UsersInRoomQueryVariables>) {
          return Apollo.useLazyQuery<UsersInRoomQuery, UsersInRoomQueryVariables>(UsersInRoomDocument, baseOptions);
        }
export type UsersInRoomQueryHookResult = ReturnType<typeof useUsersInRoomQuery>;
export type UsersInRoomLazyQueryHookResult = ReturnType<typeof useUsersInRoomLazyQuery>;
export type UsersInRoomQueryResult = Apollo.QueryResult<UsersInRoomQuery, UsersInRoomQueryVariables>;