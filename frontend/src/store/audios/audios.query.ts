import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../../vite-env.d";

export type SaveVoiceArgs = {
  messageid: string;
  formData: FormData;
};

export const audiosApi = createApi({
  reducerPath: "audios-api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL + "/api/audios",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveVoice: builder.mutation({
      query: ({ formData, messageid }: SaveVoiceArgs) => ({
        url: "",
        method: "POST",
        body: formData,
        params: {
          messageid,
        },
      }),
    }),
    getVoice: builder.query({
      query: (messageid: string) => ({
        url: "",
        method: "GET",
        params: {
          messageid,
        },
      }),
    }),
  }),
});

export const { useSaveVoiceMutation, useGetVoiceQuery } = audiosApi;
