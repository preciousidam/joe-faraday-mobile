import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { ClientData } from "./types";
import { DeleteRecord } from "store/payment/types";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.authentication_token;
      const csrf = (getState() as RootState).auth.csrf_token;
      if (token && csrf) {
        headers.set("AUTHENTICATION-TOKEN", `${token}`);
        headers.set("XSRF-TOKEN", `${csrf}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    fetchClients: builder.query<ClientData[], void>({
      query: () => "clients/",
    }),
    fetchClient: builder.query<ClientData, number>({
      query: (id) => `clients/${id}`,
      providesTags: ["Client"],
    }),
    addClient: builder.mutation<ClientData, ClientData>({
      query: (body) => ({
        url: "clients/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Client"],
    }),
    editClient: builder.mutation<ClientData, ClientData>({
      query: (body) => ({
        url: `clients/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation<void, DeleteRecord>({
      query: ({ id, reason }) => ({
        url: `clients/${id}`,
        method: "DELETE",
        body: { reason },
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});
export const {
  useFetchClientsQuery,
  useFetchClientQuery,
  useAddClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} = clientApi;
