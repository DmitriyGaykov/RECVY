import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3001/api/auth';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl, credentials: 'include'}),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user: FormData) => ({
        url: '/reg',
        method: 'POST',
        body: user
      })
    }),
    signIn: builder.mutation({
      query: (user: FormData) => ({
        url: '/login',
        method: 'POST',
        body: user
      })
    }),
    signInWithToken: builder.mutation({
      query: () => ({
        url: '/token-login',
        method: 'POST',
      })
    })
  })
})

export const {useSignUpMutation, useSignInWithTokenMutation, useSignInMutation} = authApi;