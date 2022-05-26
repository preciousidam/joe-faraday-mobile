import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { Request, Response, Password } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/accounts/`,
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
  endpoints: (builder) => ({
    login: builder.mutation<Response, Request>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation<any, Password>({
      query: (credentials) => ({
        url: "change",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useChangePasswordMutation } = authApi;
