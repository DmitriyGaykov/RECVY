import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dateMapper } from "../../utils";
import { User } from "../../models";
import { SERVER_URL } from "../../vite-env.d";

export type GetUserArgs = {
  searchText?: string;
  page: number;
};

export const usersApi = createApi({
  reducerPath: "users-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/users",
    credentials: "include"
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: (userid: string) => ({
        url: "",
        method: "GET",
        params: { userid: userid || "1" },
      }),
      transformResponse: (response) => dateMapper(response, "regdate"),
    }),
    editUserInfo: build.mutation({
      query: (userInfo: User) => ({
        url: "",
        method: "PATCH",
        body: userInfo,
      }),
    }),
    getUsers: build.query({
      query: ({ searchText, page }: GetUserArgs) => ({
        url: "",
        method: "GET",
        params: {
          searchText: searchText || "",
          page,
        },
      }),
      keepUnusedDataFor: 0
    })
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useEditUserInfoMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery
} = usersApi;
