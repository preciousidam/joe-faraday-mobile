import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { UserData } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<UserData[], void>({
      query: () => "users/",
    }),
    fetchUser: builder.query<UserData, number | void>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    fetchCurrentUser: builder.query<UserData, void>({
      query: (id) => `users/?user=current`,
      providesTags: ["User"],
    }),
    addUser: builder.mutation<UserData, UserData>({
      query: (body) => ({
        url: "users/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation<UserData, UserData>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useFetchUsersQuery,
  useFetchUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useFetchCurrentUserQuery,
} = userApi;
