import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const photosApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  endpoints: builder => ({
    getPhoto: builder.query({
      query: (url: string) => ({
        url,
        method: 'GET'
      })
    })
  })
})

export const { useGetPhotoQuery } = photosApi;