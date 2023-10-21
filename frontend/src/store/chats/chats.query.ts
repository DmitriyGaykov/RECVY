import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {dateMapper} from "../../utils";
import {ChatId} from "./chats.slice.ts";

export const chatsApi = createApi({
  reducerPath: 'chats-api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/chats',
    credentials: 'include'
  }),
  endpoints: build => ({
    getChats: build.query({
      query: (page?: number) => ({
        url: '',
        method: 'GET',
        params: {page}
      }),
      transformResponse: response => {
        return response?.map(el => dateMapper(el, 'sentdate'));
      }
    }),
    removeChat: build.mutation({
      query: (userid: ChatId) => ({
        url: ``,
        method: 'DELETE',
        params: {userid}
      })
    })
  })
});

export const {useGetChatsQuery, useRemoveChatMutation} = chatsApi;