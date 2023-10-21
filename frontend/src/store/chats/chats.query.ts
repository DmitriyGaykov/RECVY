import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {dateMapper} from "../../utils";

export const chatsApi = createApi({
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
    })
  })
});

export const {useGetChatsQuery} = chatsApi;