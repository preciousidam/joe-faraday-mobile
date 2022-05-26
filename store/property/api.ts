import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { PropertyData, Document } from "./types";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
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
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    fetchProperties: builder.query<PropertyData[], void>({
      query: () => "properties/",
    }),
    fetchProperty: builder.query<PropertyData, number>({
      query: (id) => `properties/${id}`,
      providesTags: ["Property"],
    }),
    addProperty: builder.mutation<PropertyData, PropertyData>({
      query: (body) => ({
        url: "properties/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Property"],
    }),
    editProperty: builder.mutation<PropertyData, PropertyData>({
      query: (body) => ({
        url: `properties/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Property"],
    }),
    deleteProperty: builder.mutation<void, number>({
      query: (id) => ({
        url: `properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});
export const {
  useAddPropertyMutation,
  useEditPropertyMutation,
  useFetchPropertiesQuery,
  useDeletePropertyMutation,
  useFetchPropertyQuery,
} = propertyApi;
