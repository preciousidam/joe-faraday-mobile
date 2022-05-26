import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { AgentData } from "./types";

export const agentApi = createApi({
  reducerPath: "agentApi",
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
  tagTypes: ["Agent"],
  endpoints: (builder) => ({
    fetchAgents: builder.query<AgentData[], void>({
      query: () => "agents/",
    }),
    fetchAgent: builder.query<AgentData, number>({
      query: (id) => `agents/${id}`,
      providesTags: ["Agent"],
    }),
    addAgent: builder.mutation<AgentData, AgentData>({
      query: (body) => ({
        url: "agents/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Agent"],
    }),
    editAgent: builder.mutation<AgentData, AgentData>({
      query: (body) => ({
        url: `agents/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Agent"],
    }),
    deleteAgent: builder.mutation<void, number>({
      query: (id) => ({
        url: `agents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Agent"],
    }),
  }),
});
export const {
  useFetchAgentsQuery,
  useFetchAgentQuery,
  useAddAgentMutation,
  useEditAgentMutation,
  useDeleteAgentMutation,
} = agentApi;
