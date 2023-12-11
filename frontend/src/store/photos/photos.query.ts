import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../vite-env.d";

export const photosApi = createApi({
  reducerPath: "photos-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPhoto: builder.query({
      query: (url: string) => ({
        url,
        method: "GET",
      }),
    }),
    addPhoto: builder.mutation({
      query: (fdata: FormData) => ({
        url: "/api/users/photos",
        method: "POST",
        body: fdata,
      }),
    }),
    deletePhoto: builder.mutation({
      query: (photoName: string) => ({
        url: "/api/users/photos",
        method: "DELETE",
        params: {
          photoName: photoName?.split("/")?.at(-1),
        },
      }),
    }),
  }),
});

export const { useGetPhotoQuery, useAddPhotoMutation, useDeletePhotoMutation } =
  photosApi;
