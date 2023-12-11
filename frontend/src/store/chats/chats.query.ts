import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dateMapper } from "../../utils";
import { ChatId } from "./chats.slice.ts";
import { SERVER_URL } from "../../vite-env.d";

export const chatsApi = createApi({
  reducerPath: "chats-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/chats",
    credentials: "include",
    cache: "no-cache",
  }),
  endpoints: (build) => ({
    getChats: build.query({
      query: (page?: number) => ({
        url: "",
        method: "GET",
        params: { page },
      }),
      transformResponse: (response) => {
        return response?.map((el) => dateMapper(el, "sentdate"));
      },
      keepUnusedDataFor: 0,
    }),
    removeChat: build.mutation({
      query: (userid: ChatId) => ({
        url: ``,
        method: "DELETE",
        params: { userid },
      }),
    }),
    getChat: build.query({
      query: (userid: String) => {
        if (!userid) return null;
        return {
          url: "",
          method: "GET",
          params: {
            userid: userid?.toString(),
          },
        };
      },
      transformResponse: (response) => dateMapper(response, "sentdate"),
    }),
  }),
});

export const { useGetChatsQuery, useGetChatQuery, useRemoveChatMutation } =
  chatsApi;
