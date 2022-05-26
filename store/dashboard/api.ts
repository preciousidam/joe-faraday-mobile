import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { DashBoardData } from "./types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/index`,
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
    fetchData: builder.query<DashBoardData, void>({
      query: () => "/",
    }),
  }),
});
export const { useFetchDataQuery } = dashboardApi;
