import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  emails: PaginatedEmails;
  friends: Array<Friend>;
  friendRequests: Array<Friend>;
  rooms: Array<Room>;
  me?: Maybe<User>;
};

export type QueryEmailsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryRoomsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type PaginatedEmails = {
  __typename?: "PaginatedEmails";
  emails: Array<Email>;
  hasMore: Scalars["Boolean"];
};

export type Email = {
  __typename?: "Email";
  id: Scalars["String"];
  from: Scalars["String"];
  to: Scalars["String"];
  subject: Scalars["String"];
  message: Scalars["String"];
  createdAt: Scalars["String"];
};

export type Friend = {
  __typename?: "Friend";
  id: Scalars["String"];
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
  sendEmail: SendEmailResonse;
  createFriendRequest: RequestResponse;
  acceptFriendRequest: Scalars["Boolean"];
  declineFriendRequest: Scalars["Boolean"];
  createRoom: Scalars["String"];
  joinRoom: JoinRoomRes;
  signIn: User;
  signOut: Scalars["Boolean"];
  changeStatus?: Maybe<User>;
};

export type MutationSendEmailArgs = {
  options: EmailContent;
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

export type SendEmailResonse = {
  __typename?: "SendEmailResonse";
  email?: Maybe<Email>;
  error?: Maybe<RequestResponse>;
};

export type RequestResponse = {
  __typename?: "RequestResponse";
  message: Scalars["String"];
  status: Scalars["String"];
};

export type EmailContent = {
  to: Scalars["String"];
  subject: Scalars["String"];
  message: Scalars["String"];
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
  newEmail: Email;
  newFriendRequst: Friend;
  newFriend: Friend;
};

export type RegularEmailResponseFragment = { __typename?: "Email" } & Pick<
  Email,
  "id" | "from" | "to" | "subject" | "message" | "createdAt"
>;

export type RegularFriendResponseFragment = { __typename?: "Friend" } & Pick<
  Friend,
  "id" | "createdAt"
> & { user: { __typename?: "User" } & RegularUserResponseFragment };

export type RegularUserResponseFragment = { __typename?: "User" } & Pick<
  User,
  "email" | "displayName" | "photoUrl" | "status"
>;

export type AcceptFriendRequestMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type AcceptFriendRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "acceptFriendRequest"
>;

export type ChangeStatusMutationVariables = Exact<{
  status: Scalars["String"];
}>;

export type ChangeStatusMutation = { __typename?: "Mutation" } & {
  changeStatus?: Maybe<{ __typename?: "User" } & RegularUserResponseFragment>;
};

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

export type SendEmailMutationVariables = Exact<{
  options: EmailContent;
}>;

export type SendEmailMutation = { __typename?: "Mutation" } & {
  sendEmail: { __typename?: "SendEmailResonse" } & {
    email?: Maybe<{ __typename?: "Email" } & RegularEmailResponseFragment>;
    error?: Maybe<
      { __typename?: "RequestResponse" } & Pick<
        RequestResponse,
        "message" | "status"
      >
    >;
  };
};

export type SignInMutationVariables = Exact<{
  options: SignInOptionsInput;
}>;

export type SignInMutation = { __typename?: "Mutation" } & {
  signIn: { __typename?: "User" } & RegularUserResponseFragment;
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signOut"
>;

export type EmailsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: Maybe<Scalars["String"]>;
}>;

export type EmailsQuery = { __typename?: "Query" } & {
  emails: { __typename?: "PaginatedEmails" } & Pick<
    PaginatedEmails,
    "hasMore"
  > & {
      emails: Array<{ __typename?: "Email" } & RegularEmailResponseFragment>;
    };
};

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never }>;

export type FriendRequestsQuery = { __typename?: "Query" } & {
  friendRequests: Array<
    { __typename?: "Friend" } & RegularFriendResponseFragment
  >;
};

export type FriendsQueryVariables = Exact<{ [key: string]: never }>;

export type FriendsQuery = { __typename?: "Query" } & {
  friends: Array<{ __typename?: "Friend" } & RegularFriendResponseFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserResponseFragment>;
};

export type NewEmailSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewEmailSubscription = { __typename?: "Subscription" } & {
  newEmail: { __typename?: "Email" } & RegularEmailResponseFragment;
};

export type NewFriendSubscriptionVariables = Exact<{ [key: string]: never }>;

export type NewFriendSubscription = { __typename?: "Subscription" } & {
  newFriend: { __typename?: "Friend" } & RegularFriendResponseFragment;
};

export type NewFriendRequstSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type NewFriendRequstSubscription = { __typename?: "Subscription" } & {
  newFriendRequst: { __typename?: "Friend" } & RegularFriendResponseFragment;
};

export const RegularEmailResponseFragmentDoc = gql`
  fragment RegularEmailResponse on Email {
    id
    from
    to
    subject
    message
    createdAt
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on User {
    email
    displayName
    photoUrl
    status
  }
`;
export const RegularFriendResponseFragmentDoc = gql`
  fragment RegularFriendResponse on Friend {
    id
    user {
      ...RegularUserResponse
    }
    createdAt
  }
  ${RegularUserResponseFragmentDoc}
`;
export const AcceptFriendRequestDocument = gql`
  mutation AcceptFriendRequest($email: String!) {
    acceptFriendRequest(email: $email)
  }
`;

export function useAcceptFriendRequestMutation() {
  return Urql.useMutation<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >(AcceptFriendRequestDocument);
}
export const ChangeStatusDocument = gql`
  mutation ChangeStatus($status: String!) {
    changeStatus(status: $status) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useChangeStatusMutation() {
  return Urql.useMutation<ChangeStatusMutation, ChangeStatusMutationVariables>(
    ChangeStatusDocument
  );
}
export const CreateFriendRequestDocument = gql`
  mutation CreateFriendRequest($email: String!) {
    createFriendRequest(email: $email) {
      message
      status
    }
  }
`;

export function useCreateFriendRequestMutation() {
  return Urql.useMutation<
    CreateFriendRequestMutation,
    CreateFriendRequestMutationVariables
  >(CreateFriendRequestDocument);
}
export const CreateRoomDocument = gql`
  mutation CreateRoom {
    createRoom
  }
`;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument
  );
}
export const DeclineFriendRequestDocument = gql`
  mutation DeclineFriendRequest($email: String!) {
    declineFriendRequest(email: $email)
  }
`;

export function useDeclineFriendRequestMutation() {
  return Urql.useMutation<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >(DeclineFriendRequestDocument);
}
export const JoinRoomDocument = gql`
  mutation JoinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      users
      error
    }
  }
`;

export function useJoinRoomMutation() {
  return Urql.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(
    JoinRoomDocument
  );
}
export const SendEmailDocument = gql`
  mutation SendEmail($options: EmailContent!) {
    sendEmail(options: $options) {
      email {
        ...RegularEmailResponse
      }
      error {
        message
        status
      }
    }
  }
  ${RegularEmailResponseFragmentDoc}
`;

export function useSendEmailMutation() {
  return Urql.useMutation<SendEmailMutation, SendEmailMutationVariables>(
    SendEmailDocument
  );
}
export const SignInDocument = gql`
  mutation SignIn($options: SignInOptionsInput!) {
    signIn(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument
  );
}
export const SignOutDocument = gql`
  mutation SignOut {
    signOut
  }
`;

export function useSignOutMutation() {
  return Urql.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument
  );
}
export const EmailsDocument = gql`
  query Emails($limit: Int!, $cursor: String) {
    emails(limit: $limit, cursor: $cursor) {
      hasMore
      emails {
        ...RegularEmailResponse
      }
    }
  }
  ${RegularEmailResponseFragmentDoc}
`;

export function useEmailsQuery(
  options: Omit<Urql.UseQueryArgs<EmailsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<EmailsQuery>({ query: EmailsDocument, ...options });
}
export const FriendRequestsDocument = gql`
  query FriendRequests {
    friendRequests {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useFriendRequestsQuery(
  options: Omit<Urql.UseQueryArgs<FriendRequestsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FriendRequestsQuery>({
    query: FriendRequestsDocument,
    ...options,
  });
}
export const FriendsDocument = gql`
  query Friends {
    friends {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useFriendsQuery(
  options: Omit<Urql.UseQueryArgs<FriendsQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<FriendsQuery>({ query: FriendsDocument, ...options });
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const NewEmailDocument = gql`
  subscription NewEmail {
    newEmail {
      ...RegularEmailResponse
    }
  }
  ${RegularEmailResponseFragmentDoc}
`;

export function useNewEmailSubscription<TData = NewEmailSubscription>(
  options: Omit<
    Urql.UseSubscriptionArgs<NewEmailSubscriptionVariables>,
    "query"
  > = {},
  handler?: Urql.SubscriptionHandler<NewEmailSubscription, TData>
) {
  return Urql.useSubscription<
    NewEmailSubscription,
    TData,
    NewEmailSubscriptionVariables
  >({ query: NewEmailDocument, ...options }, handler);
}
export const NewFriendDocument = gql`
  subscription NewFriend {
    newFriend {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useNewFriendSubscription<TData = NewFriendSubscription>(
  options: Omit<
    Urql.UseSubscriptionArgs<NewFriendSubscriptionVariables>,
    "query"
  > = {},
  handler?: Urql.SubscriptionHandler<NewFriendSubscription, TData>
) {
  return Urql.useSubscription<
    NewFriendSubscription,
    TData,
    NewFriendSubscriptionVariables
  >({ query: NewFriendDocument, ...options }, handler);
}
export const NewFriendRequstDocument = gql`
  subscription NewFriendRequst {
    newFriendRequst {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useNewFriendRequstSubscription<
  TData = NewFriendRequstSubscription
>(
  options: Omit<
    Urql.UseSubscriptionArgs<NewFriendRequstSubscriptionVariables>,
    "query"
  > = {},
  handler?: Urql.SubscriptionHandler<NewFriendRequstSubscription, TData>
) {
  return Urql.useSubscription<
    NewFriendRequstSubscription,
    TData,
    NewFriendRequstSubscriptionVariables
  >({ query: NewFriendRequstDocument, ...options }, handler);
}
