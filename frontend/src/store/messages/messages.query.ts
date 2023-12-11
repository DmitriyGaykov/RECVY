import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Message } from "../../models";
import { EditMessageParams } from "./messages.slice.ts";
import { dateMapper } from "../../utils";
import { SERVER_URL } from "../../vite-env.d";

export type GetMessageParams = {
  iduserto: string;
  page?: number;
};

export const messagesApi = createApi({
  reducerPath: "messages-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/messages",
    credentials: "include",
    cache: "no-cache",
  }),
  endpoints: (build) => ({
    getMessagesFrom: build.query({
      query: ({ iduserto, page }: GetMessageParams) => ({
        url: "",
        params: {
          iduserto,
          page,
        },
      }),
      transformResponse: (response: any) =>
        response.map<Message[]>((el) => dateMapper(el, "sentdate")),
      keepUnusedDataFor: 0
    }),
    sendMessage: build.mutation({
      query: (message: Message) => ({
        url: "",
        method: "POST",
        body: message,
      }),
    }),
    deleteMessage: build.mutation({
      query: (messageid: string) => ({
        url: "",
        method: "DELETE",
        params: {
          messageid,
        },
      }),
    }),
    editMessage: build.mutation({
      query: ({ messageid, newValue }: EditMessageParams) => ({
        url: "",
        method: "PATCH",
        body: {
          message: newValue,
        },
        params: {
          messageid,
        },
      }),
    }),
  }),
});

export const {
  useGetMessagesFromQuery,
  useSendMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messagesApi;
