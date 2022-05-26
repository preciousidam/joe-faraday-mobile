import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { TeamMemberData } from "./types";

export const teamApi = createApi({
  reducerPath: "teamApi",
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
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    fetchTeams: builder.query<TeamMemberData[], void>({
      query: () => "cortts_team/",
    }),
    fetchTeamMember: builder.query<TeamMemberData, number>({
      query: (id) => `cortts_team/${id}`,
      providesTags: ["Team"],
    }),
    addTeam: builder.mutation<TeamMemberData, TeamMemberData>({
      query: (body) => ({
        url: "cortts_team/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
    editTeam: builder.mutation<TeamMemberData, TeamMemberData>({
      query: (body) => ({
        url: `cortts_team/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeam: builder.mutation<void, number>({
      query: (id) => ({
        url: `cortts_team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});
export const {
  useFetchTeamsQuery,
  useFetchTeamMemberQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
