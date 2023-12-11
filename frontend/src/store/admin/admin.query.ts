import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SERVER_URL} from "../../vite-env.d";

export type BlockUserArgs = {
  userid: string;
  reason: string;
}

export type GetBlockedUsersArgs = {
  page: number;
  searchText: string;
}

export const adminApi = createApi({
  reducerPath: 'admin-api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + '/api/admin',
    credentials: 'include'
  }),
  endpoints: builder => ({
    getBlockedUsers: builder.query({
      query: (args: GetBlockedUsersArgs) => ({
        url: '/users',
        method: 'GET',
        params: args
      })
    }),
    deleteUser: builder.mutation({
      query: (useridtodell: string) => ({
        url: '/users',
        method: 'DELETE',
        params: {
          useridtodell
        }
      })
    }),
    blockUser: builder.mutation({
      query: ({userid, reason}: BlockUserArgs) => ({
        url: '/users',
        method: 'POST',
        params: {
          userid
        },
        body: {
          reason
        }
      })
    }),
    unBlockUser: builder.mutation({
      query: (userid: string) => ({
        url: '/users',
        method: 'DELETE',
        params: {
          userid
        }
      })
    }),
    getBlockReason: builder.query({
      query: (userid: string) => ({
        url: '/users/reason',
        method: 'GET',
        params: {
          userid
        }
      })
    }),
    addSticker: builder.mutation({
      query: (formData: FormData) => ({
        url: "/stickers",
        method: 'POST',
        body: formData
      })
    }),
    deleteSticker: builder.mutation({
      query: (stickerid: string) => ({
        url: "/stickers",
        method: "DELETE",
        params: {
          stickerid
        }
      })
    })
  })
})

export const {
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useGetBlockReasonQuery,
  useLazyGetBlockReasonQuery,
  useGetBlockedUsersQuery,
  useLazyGetBlockedUsersQuery,
  useAddStickerMutation,
  useDeleteStickerMutation
} = adminApi;