import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "../../models";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api'}),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user : FormData) => ({
        url: '/auth/reg',
        method: 'POST',
        body: user
      })
    })
  })
})

export const {useSignUpMutation} = usersApi;