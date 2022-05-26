import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { UnitData, Document, IHandover } from "./types";

export const unitApi = createApi({
  reducerPath: "unitApi",
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
  tagTypes: ["Unit"],
  endpoints: (builder) => ({
    fetchUnits: builder.query<UnitData[], void | string>({
      query: (query) => (Boolean(query) ? `units/?q=${query}` : `units/`),
    }),
    fetchUnit: builder.query<UnitData, number>({
      query: (id) => `units/${id}`,
      providesTags: ["Unit"],
    }),
    addUnit: builder.mutation<UnitData, UnitData>({
      query: (body) => ({
        url: "units/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Unit"],
    }),
    editUnit: builder.mutation<UnitData, UnitData>({
      query: (body) => ({
        url: `units/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Unit"],
    }),
    handover: builder.mutation<UnitData, IHandover & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `units/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Unit"],
    }),
    deleteUnit: builder.mutation<void, number>({
      query: (id) => ({
        url: `units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});
export const {
  useAddUnitMutation,
  useEditUnitMutation,
  useFetchUnitsQuery,
  useDeleteUnitMutation,
  useFetchUnitQuery,
  useHandoverMutation,
} = unitApi;
