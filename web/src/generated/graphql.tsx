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

export type Email = {
  __typename?: "Email";
  id: Scalars["String"];
  senderEmail: Scalars["String"];
  senderPhotoURL: Scalars["String"];
  subject: Scalars["String"];
  message: Scalars["String"];
  createdAt: Scalars["String"];
};

export type EmailContent = {
  to: Scalars["String"];
  subject: Scalars["String"];
  message: Scalars["String"];
};

export type Friend = {
  __typename?: "Friend";
  id: Scalars["String"];
  user: User;
  createdAt: Scalars["String"];
};

export type InviteResponse = {
  __typename?: "InviteResponse";
  error?: Maybe<RequestResponse>;
  roomId?: Maybe<Scalars["String"]>;
};

export type JoinRoomInput = {
  roomId: Scalars["String"];
  socketId: Scalars["String"];
};

export type JoinRoomRes = {
  __typename?: "JoinRoomRes";
  users?: Maybe<Array<UserInfo>>;
  error?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  sendEmail: SendEmailResonse;
  createFriendRequest: RequestResponse;
  acceptFriendRequest: Scalars["Boolean"];
  declineFriendRequest: Scalars["Boolean"];
  inviteFriend: RequestResponse;
  acceptInvite: InviteResponse;
  declineInvite: Scalars["Boolean"];
  unfriend: Scalars["Boolean"];
  createRoom: Scalars["String"];
  joinRoom: JoinRoomRes;
  signIn: User;
  changeStatus?: Maybe<User>;
};

export type MutationSendEmailArgs = {
  options: EmailContent;
  uid: Scalars["String"];
};

export type MutationCreateFriendRequestArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationAcceptFriendRequestArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationDeclineFriendRequestArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationInviteFriendArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationAcceptInviteArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationDeclineInviteArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationUnfriendArgs = {
  email: Scalars["String"];
  uid: Scalars["String"];
};

export type MutationCreateRoomArgs = {
  uid: Scalars["String"];
};

export type MutationJoinRoomArgs = {
  input: JoinRoomInput;
  uid: Scalars["String"];
};

export type MutationSignInArgs = {
  options: SignInOptionsInput;
};

export type MutationChangeStatusArgs = {
  status: Scalars["String"];
  uid: Scalars["String"];
};

export type PaginatedEmails = {
  __typename?: "PaginatedEmails";
  emails: Array<Email>;
  hasMore: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  emails: PaginatedEmails;
  friends: Array<Friend>;
  friendRequests: Array<Friend>;
  invites: Array<Friend>;
  rooms: Array<Room>;
  me?: Maybe<User>;
};

export type QueryEmailsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
  uid: Scalars["String"];
};

export type QueryFriendsArgs = {
  uid: Scalars["String"];
};

export type QueryFriendRequestsArgs = {
  uid: Scalars["String"];
};

export type QueryInvitesArgs = {
  uid: Scalars["String"];
};

export type QueryRoomsArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type QueryMeArgs = {
  uid: Scalars["String"];
};

export type RequestResponse = {
  __typename?: "RequestResponse";
  message: Scalars["String"];
  status: Scalars["String"];
};

export type Room = {
  __typename?: "Room";
  id: Scalars["String"];
  createdAt: Scalars["String"];
};

export type SendEmailResonse = {
  __typename?: "SendEmailResonse";
  email?: Maybe<Email>;
  error?: Maybe<RequestResponse>;
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
  newInvite: Friend;
};

export type SubscriptionNewEmailArgs = {
  uid: Scalars["String"];
};

export type SubscriptionNewFriendRequstArgs = {
  uid: Scalars["String"];
};

export type SubscriptionNewFriendArgs = {
  uid: Scalars["String"];
};

export type SubscriptionNewInviteArgs = {
  uid: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  displayName: Scalars["String"];
  photoUrl: Scalars["String"];
  status: Scalars["String"];
};

export type UserInfo = {
  __typename?: "UserInfo";
  socketId: Scalars["String"];
};

export type RegularEmailResponseFragment = { __typename?: "Email" } & Pick<
  Email,
  "id" | "senderEmail" | "senderPhotoURL" | "subject" | "message" | "createdAt"
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
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type AcceptFriendRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "acceptFriendRequest"
>;

export type AcceptInviteMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type AcceptInviteMutation = { __typename?: "Mutation" } & {
  acceptInvite: { __typename?: "InviteResponse" } & Pick<
    InviteResponse,
    "roomId"
  > & {
      error?: Maybe<
        { __typename?: "RequestResponse" } & Pick<
          RequestResponse,
          "message" | "status"
        >
      >;
    };
};

export type ChangeStatusMutationVariables = Exact<{
  uid: Scalars["String"];
  status: Scalars["String"];
}>;

export type ChangeStatusMutation = { __typename?: "Mutation" } & {
  changeStatus?: Maybe<{ __typename?: "User" } & RegularUserResponseFragment>;
};

export type CreateFriendRequestMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type CreateFriendRequestMutation = { __typename?: "Mutation" } & {
  createFriendRequest: { __typename?: "RequestResponse" } & Pick<
    RequestResponse,
    "message" | "status"
  >;
};

export type CreateRoomMutationVariables = Exact<{
  uid: Scalars["String"];
}>;

export type CreateRoomMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createRoom"
>;

export type DeclineFriendRequestMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type DeclineFriendRequestMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "declineFriendRequest"
>;

export type DeclineInviteMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type DeclineInviteMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "declineInvite"
>;

export type InviteFriendMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type InviteFriendMutation = { __typename?: "Mutation" } & {
  inviteFriend: { __typename?: "RequestResponse" } & Pick<
    RequestResponse,
    "message" | "status"
  >;
};

export type JoinRoomMutationVariables = Exact<{
  uid: Scalars["String"];
  input: JoinRoomInput;
}>;

export type JoinRoomMutation = { __typename?: "Mutation" } & {
  joinRoom: { __typename?: "JoinRoomRes" } & Pick<JoinRoomRes, "error"> & {
      users?: Maybe<
        Array<{ __typename?: "UserInfo" } & Pick<UserInfo, "socketId">>
      >;
    };
};

export type SendEmailMutationVariables = Exact<{
  uid: Scalars["String"];
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

export type UnfriendMutationVariables = Exact<{
  uid: Scalars["String"];
  email: Scalars["String"];
}>;

export type UnfriendMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "unfriend"
>;

export type EmailsQueryVariables = Exact<{
  uid: Scalars["String"];
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

export type FriendRequestsQueryVariables = Exact<{
  uid: Scalars["String"];
}>;

export type FriendRequestsQuery = { __typename?: "Query" } & {
  friendRequests: Array<
    { __typename?: "Friend" } & RegularFriendResponseFragment
  >;
};

export type FriendsQueryVariables = Exact<{
  uid: Scalars["String"];
}>;

export type FriendsQuery = { __typename?: "Query" } & {
  friends: Array<{ __typename?: "Friend" } & RegularFriendResponseFragment>;
};

export type InvitesQueryVariables = Exact<{
  uid: Scalars["String"];
}>;

export type InvitesQuery = { __typename?: "Query" } & {
  invites: Array<{ __typename?: "Friend" } & RegularFriendResponseFragment>;
};

export type MeQueryVariables = Exact<{
  uid: Scalars["String"];
}>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserResponseFragment>;
};

export type NewEmailSubscriptionVariables = Exact<{
  uid: Scalars["String"];
}>;

export type NewEmailSubscription = { __typename?: "Subscription" } & {
  newEmail: { __typename?: "Email" } & RegularEmailResponseFragment;
};

export type NewFriendSubscriptionVariables = Exact<{
  uid: Scalars["String"];
}>;

export type NewFriendSubscription = { __typename?: "Subscription" } & {
  newFriend: { __typename?: "Friend" } & RegularFriendResponseFragment;
};

export type NewFriendRequstSubscriptionVariables = Exact<{
  uid: Scalars["String"];
}>;

export type NewFriendRequstSubscription = { __typename?: "Subscription" } & {
  newFriendRequst: { __typename?: "Friend" } & RegularFriendResponseFragment;
};

export type NewInviteSubscriptionVariables = Exact<{
  uid: Scalars["String"];
}>;

export type NewInviteSubscription = { __typename?: "Subscription" } & {
  newInvite: { __typename?: "Friend" } & RegularFriendResponseFragment;
};

export const RegularEmailResponseFragmentDoc = gql`
  fragment RegularEmailResponse on Email {
    id
    senderEmail
    senderPhotoURL
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
  mutation AcceptFriendRequest($uid: String!, $email: String!) {
    acceptFriendRequest(uid: $uid, email: $email)
  }
`;

export function useAcceptFriendRequestMutation() {
  return Urql.useMutation<
    AcceptFriendRequestMutation,
    AcceptFriendRequestMutationVariables
  >(AcceptFriendRequestDocument);
}
export const AcceptInviteDocument = gql`
  mutation AcceptInvite($uid: String!, $email: String!) {
    acceptInvite(uid: $uid, email: $email) {
      roomId
      error {
        message
        status
      }
    }
  }
`;

export function useAcceptInviteMutation() {
  return Urql.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(
    AcceptInviteDocument
  );
}
export const ChangeStatusDocument = gql`
  mutation ChangeStatus($uid: String!, $status: String!) {
    changeStatus(uid: $uid, status: $status) {
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
  mutation CreateFriendRequest($uid: String!, $email: String!) {
    createFriendRequest(uid: $uid, email: $email) {
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
  mutation CreateRoom($uid: String!) {
    createRoom(uid: $uid)
  }
`;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(
    CreateRoomDocument
  );
}
export const DeclineFriendRequestDocument = gql`
  mutation DeclineFriendRequest($uid: String!, $email: String!) {
    declineFriendRequest(uid: $uid, email: $email)
  }
`;

export function useDeclineFriendRequestMutation() {
  return Urql.useMutation<
    DeclineFriendRequestMutation,
    DeclineFriendRequestMutationVariables
  >(DeclineFriendRequestDocument);
}
export const DeclineInviteDocument = gql`
  mutation DeclineInvite($uid: String!, $email: String!) {
    declineInvite(uid: $uid, email: $email)
  }
`;

export function useDeclineInviteMutation() {
  return Urql.useMutation<
    DeclineInviteMutation,
    DeclineInviteMutationVariables
  >(DeclineInviteDocument);
}
export const InviteFriendDocument = gql`
  mutation InviteFriend($uid: String!, $email: String!) {
    inviteFriend(uid: $uid, email: $email) {
      message
      status
    }
  }
`;

export function useInviteFriendMutation() {
  return Urql.useMutation<InviteFriendMutation, InviteFriendMutationVariables>(
    InviteFriendDocument
  );
}
export const JoinRoomDocument = gql`
  mutation JoinRoom($uid: String!, $input: JoinRoomInput!) {
    joinRoom(uid: $uid, input: $input) {
      error
      users {
        socketId
      }
    }
  }
`;

export function useJoinRoomMutation() {
  return Urql.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(
    JoinRoomDocument
  );
}
export const SendEmailDocument = gql`
  mutation SendEmail($uid: String!, $options: EmailContent!) {
    sendEmail(uid: $uid, options: $options) {
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
export const UnfriendDocument = gql`
  mutation Unfriend($uid: String!, $email: String!) {
    unfriend(uid: $uid, email: $email)
  }
`;

export function useUnfriendMutation() {
  return Urql.useMutation<UnfriendMutation, UnfriendMutationVariables>(
    UnfriendDocument
  );
}
export const EmailsDocument = gql`
  query Emails($uid: String!, $limit: Int!, $cursor: String) {
    emails(uid: $uid, limit: $limit, cursor: $cursor) {
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
  query FriendRequests($uid: String!) {
    friendRequests(uid: $uid) {
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
  query Friends($uid: String!) {
    friends(uid: $uid) {
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
export const InvitesDocument = gql`
  query Invites($uid: String!) {
    invites(uid: $uid) {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useInvitesQuery(
  options: Omit<Urql.UseQueryArgs<InvitesQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<InvitesQuery>({ query: InvitesDocument, ...options });
}
export const MeDocument = gql`
  query Me($uid: String!) {
    me(uid: $uid) {
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
  subscription NewEmail($uid: String!) {
    newEmail(uid: $uid) {
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
  subscription NewFriend($uid: String!) {
    newFriend(uid: $uid) {
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
  subscription NewFriendRequst($uid: String!) {
    newFriendRequst(uid: $uid) {
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
export const NewInviteDocument = gql`
  subscription NewInvite($uid: String!) {
    newInvite(uid: $uid) {
      ...RegularFriendResponse
    }
  }
  ${RegularFriendResponseFragmentDoc}
`;

export function useNewInviteSubscription<TData = NewInviteSubscription>(
  options: Omit<
    Urql.UseSubscriptionArgs<NewInviteSubscriptionVariables>,
    "query"
  > = {},
  handler?: Urql.SubscriptionHandler<NewInviteSubscription, TData>
) {
  return Urql.useSubscription<
    NewInviteSubscription,
    TData,
    NewInviteSubscriptionVariables
  >({ query: NewInviteDocument, ...options }, handler);
}
