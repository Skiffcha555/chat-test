import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddUsersToRoomInput = {
  room_id: Scalars['Int']['input'];
  users_ids: Array<Scalars['Int']['input']>;
};

export type AuthDto = {
  __typename?: 'AuthDTO';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateMessageInput = {
  room_id: Scalars['Float']['input'];
  text: Scalars['String']['input'];
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  users_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GetMessageInput = {
  orderBy?: Scalars['String']['input'];
  room_id: Scalars['Float']['input'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  room: Room;
  room_id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  user: User;
  user_id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToRoom: Room;
  createMessage: Message;
  createRoom: Room;
  register: User;
  signIn: AuthDto;
};


export type MutationAddUsersToRoomArgs = {
  data: AddUsersToRoomInput;
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreateRoomArgs = {
  data: CreateRoomInput;
};


export type MutationRegisterArgs = {
  data: CreateUserInput;
};


export type MutationSignInArgs = {
  data: AuthInput;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  room: Room;
  rooms: Array<Room>;
  user: User;
  userByEmail: User;
};


export type QueryMessagesArgs = {
  data: GetMessageInput;
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['Int']['output'];
  isPrivate: Scalars['Boolean']['output'];
  messages: Array<Message>;
  name?: Maybe<Scalars['String']['output']>;
  users: Array<User>;
};


export type RoomMessagesArgs = {
  orderBy: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomsMessages: Message;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  rooms: Array<Room>;
};

export type GetMessagesQueryVariables = Exact<{
  data: GetMessageInput;
}>;


export type GetMessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: number, text: string, createdAt: any, user: { __typename?: 'User', id: number, name: string, email: string } }> };

export type CreateMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, text: string, createdAt: any } };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'Room', id: number, name?: string | null, isPrivate: boolean }> };

export type GetRoomQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: number, name?: string | null, isPrivate: boolean } };

export type CreateRoomMutationVariables = Exact<{
  data: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: number, name?: string | null } };

export type RoomsMessagesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomsMessagesSubscription = { __typename?: 'Subscription', roomsMessages: { __typename?: 'Message', id: number, text: string, createdAt: any, user: { __typename?: 'User', id: number, name: string, email: string } } };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', id: number, name: string, email: string, createdAt: any } };

export type RegisterUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, name: string, email: string } };

export type LoginUserMutationVariables = Exact<{
  data: AuthInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthDTO', token: string, user: { __typename?: 'User', id: number, name: string, email: string } } };


export const GetMessagesDocument = gql`
    query GetMessages($data: GetMessageInput!) {
  messages(data: $data) {
    id
    text
    createdAt
    user {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export function useGetMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesSuspenseQueryHookResult = ReturnType<typeof useGetMessagesSuspenseQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($data: CreateMessageInput!) {
  createMessage(data: $data) {
    id
    text
    createdAt
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const GetRoomsDocument = gql`
    query GetRooms {
  rooms {
    id
    name
    isPrivate
  }
}
    `;

/**
 * __useGetRoomsQuery__
 *
 * To run a query within a React component, call `useGetRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, options);
      }
export function useGetRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, options);
        }
export function useGetRoomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, options);
        }
export type GetRoomsQueryHookResult = ReturnType<typeof useGetRoomsQuery>;
export type GetRoomsLazyQueryHookResult = ReturnType<typeof useGetRoomsLazyQuery>;
export type GetRoomsSuspenseQueryHookResult = ReturnType<typeof useGetRoomsSuspenseQuery>;
export type GetRoomsQueryResult = Apollo.QueryResult<GetRoomsQuery, GetRoomsQueryVariables>;
export const GetRoomDocument = gql`
    query GetRoom($id: Int!) {
  room(id: $id) {
    id
    name
    isPrivate
  }
}
    `;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoomQuery(baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
      }
export function useGetRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
        }
export function useGetRoomSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
        }
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomSuspenseQueryHookResult = ReturnType<typeof useGetRoomSuspenseQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<GetRoomQuery, GetRoomQueryVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($data: CreateRoomInput!) {
  createRoom(data: $data) {
    id
    name
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
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const RoomsMessagesDocument = gql`
    subscription RoomsMessages {
  roomsMessages {
    id
    text
    createdAt
    user {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useRoomsMessagesSubscription__
 *
 * To run a query within a React component, call `useRoomsMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomsMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsMessagesSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRoomsMessagesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RoomsMessagesSubscription, RoomsMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomsMessagesSubscription, RoomsMessagesSubscriptionVariables>(RoomsMessagesDocument, options);
      }
export type RoomsMessagesSubscriptionHookResult = ReturnType<typeof useRoomsMessagesSubscription>;
export type RoomsMessagesSubscriptionResult = Apollo.SubscriptionResult<RoomsMessagesSubscription>;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    name
    email
    createdAt
  }
}
    `;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export function useGetUserByEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailSuspenseQueryHookResult = ReturnType<typeof useGetUserByEmailSuspenseQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($data: CreateUserInput!) {
  register(data: $data) {
    id
    name
    email
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: AuthInput!) {
  signIn(data: $data) {
    token
    user {
      id
      name
      email
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;