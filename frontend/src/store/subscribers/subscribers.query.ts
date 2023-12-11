import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RelationButtonProps } from "../../components";
import { GetFriendsOfArgs } from "../friends";
import { SERVER_URL } from "../../vite-env.d";

export type IsSubscribingExistArgs = RelationButtonProps;

export const subscribersApi = createApi({
  reducerPath: "subscribers-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/subscribers",
    credentials: "include",
    cache: "no-cache",
  }),
  endpoints: (builder) => ({
    isSubscribingExist: builder.query({
      query: ({ who, whom }: IsSubscribingExistArgs) => ({
        url: "",
        method: "HEAD",
        params: {
          userid: who,
          whom,
        },
      }),
    }),
    getSubscribersOf: builder.query({
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
    subscribe: builder.mutation({
      query: (subTo: string) => ({
        url: "",
        method: "POST",
        params: {
          subTo,
        },
      }),
    }),
    describe: builder.mutation({
      query: (desOf: string) => ({
        url: "",
        method: "DELETE",
        params: {
          desOf,
        },
      }),
    }),
  }),
});

export const {
  useIsSubscribingExistQuery,
  useGetSubscribersOfQuery,
  useLazyGetSubscribersOfQuery,
  useSubscribeMutation,
  useDescribeMutation,
} = subscribersApi;
