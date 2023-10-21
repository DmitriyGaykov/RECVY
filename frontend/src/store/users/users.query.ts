import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {dateMapper} from "../../utils";

export const usersApi = createApi({
  reducerPath: 'users-api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/users',
    credentials: 'include'
  }),
  endpoints: build => ({
    getUser: build.query({
      query: (userid: string) => ({
        url: '',
        method: 'GET',
        params: { userid: userid || '1' }
      }),
      transformResponse: response => response && dateMapper(response, 'regdate')
    })
  })
})

console.log(usersApi);

export const { useGetUserQuery } = usersApi;