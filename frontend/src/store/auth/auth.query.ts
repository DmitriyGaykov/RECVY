import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {SERVER_URL} from "../../vite-env.d";

const baseUrl = SERVER_URL + "/api/auth";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    cache: "no-cache",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user: FormData) => ({
        url: "/reg",
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user: FormData) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),
    signInWithToken: builder.mutation({
      query: () => ({
        url: "/token-login",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInWithTokenMutation,
  useSignInMutation,
} = authApi;
