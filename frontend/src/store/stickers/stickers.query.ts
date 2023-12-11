import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../vite-env.d";

export const stickersApi = createApi({
  reducerPath: "stickers-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/stickers",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getStickers: builder.query({
      query: (page: number) => ({
        url: "",
        method: "GET",
        params: {
          page
        }
      }),
      keepUnusedDataFor: 0
    })
  }),
});

export const { useGetStickersQuery, useLazyGetStickersQuery } = stickersApi;
