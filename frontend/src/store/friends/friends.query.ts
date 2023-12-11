import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RelationButtonProps } from "../../components";
import { SERVER_URL } from "../../vite-env.d";

export type IsFriendshipExistArgs = RelationButtonProps;
export type GetFriendsOfArgs = {
  of: string;
  page: number;
  searchText?: string;
};

export const friendsApi = createApi({
  reducerPath: "friends-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/friends",
    credentials: "include",
    cache: "no-cache",
  }),
  endpoints: (builder) => ({
    isFriendshipExist: builder.query({
      query: ({ who, whom }: IsFriendshipExistArgs) => ({
        url: "",
        method: "HEAD",
        params: {
          userid: who,
          whom,
        },
      }),
    }),
    getFriendsOf: builder.query({
      query: ({ of, page, searchText }: GetFriendsOfArgs) => ({
        url: "",
        method: "GET",
        params: {
          userid: of,
          searchText: searchText || "",
          page,
        },
      }),
      keepUnusedDataFor: 0
    }),
    addFriend: builder.mutation({
      query: (whom: string) => ({
        url: "",
        method: "POST",
        params: {
          whom,
        },
      }),
    }),
    removeFriend: builder.mutation({
      query: (whom: string) => ({
        url: "",
        method: "DELETE",
        params: {
          whom,
        },
      }),
    }),
  }),
});

export const {
  useIsFriendshipExistQuery,
  useGetFriendsOfQuery,
  useLazyGetFriendsOfQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendsApi;
