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
  users: Array<User>;
  me?: Maybe<User>;
};


export type QueryRoomsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMeArgs = {
  id: Scalars['String'];
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
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: Scalars['String'];
  joinRoom: JoinRoomRes;
  register: Scalars['Boolean'];
  changeStatus?: Maybe<User>;
};


export type MutationJoinRoomArgs = {
  socketId: Scalars['String'];
  roomId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRegisterArgs = {
  id: Scalars['String'];
};


export type MutationChangeStatusArgs = {
  status: Scalars['String'];
  id: Scalars['String'];
};

export type JoinRoomRes = {
  __typename?: 'JoinRoomRes';
  users?: Maybe<Array<User>>;
  error?: Maybe<Scalars['String']>;
};

export type ChangeStatusMutationVariables = Exact<{
  id: Scalars['String'];
  status: Scalars['String'];
}>;


export type ChangeStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeStatus?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'status'>
  )> }
);

export type CreateRoomMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createRoom'>
);

export type JoinRoomMutationVariables = Exact<{
  id: Scalars['String'];
  roomId: Scalars['String'];
  socketId: Scalars['String'];
}>;


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename?: 'JoinRoomRes' }
    & Pick<JoinRoomRes, 'error'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'socketId'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type MeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'status'>
  )> }
);


export const ChangeStatusDocument = gql`
    mutation ChangeStatus($id: String!, $status: String!) {
  changeStatus(id: $id, status: $status) {
    status
  }
}
    `;
export type ChangeStatusMutationFn = Apollo.MutationFunction<ChangeStatusMutation, ChangeStatusMutationVariables>;

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
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStatusMutation, ChangeStatusMutationVariables>) {
        return Apollo.useMutation<ChangeStatusMutation, ChangeStatusMutationVariables>(ChangeStatusDocument, baseOptions);
      }
export type ChangeStatusMutationHookResult = ReturnType<typeof useChangeStatusMutation>;
export type ChangeStatusMutationResult = Apollo.MutationResult<ChangeStatusMutation>;
export type ChangeStatusMutationOptions = Apollo.BaseMutationOptions<ChangeStatusMutation, ChangeStatusMutationVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom {
  createRoom
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
    mutation JoinRoom($id: String!, $roomId: String!, $socketId: String!) {
  joinRoom(id: $id, roomId: $roomId, socketId: $socketId) {
    error
    users {
      socketId
    }
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
 *      id: // value for 'id'
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
export const RegisterDocument = gql`
    mutation Register($id: String!) {
  register(id: $id)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me($id: String!) {
  me(id: $id) {
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMeQuery(baseOptions: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;