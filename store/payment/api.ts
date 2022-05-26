import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../baseUrl";
import { RootState } from "..";
import { DeleteRecord, Payment } from "./types";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
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
  tagTypes: ["Payment", "Unit"],
  endpoints: (builder) => ({
    fetchPayments: builder.query<Payment[], { unit_id: number; id: number }>({
      query: ({ unit_id, id }) => `${unit_id}/payment/${id}`,
    }),
    fetchPayment: builder.query<Payment, number>({
      query: (id) => `payments/${id}`,
      providesTags: ["Payment"],
    }),
    addPayment: builder.mutation<Payment, Payment>({
      query: (body) => ({
        url: "payments/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment", "Unit"],
    }),
    editPayment: builder.mutation<Payment, Payment>({
      query: (body) => ({
        url: `payments/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Payment", "Unit"],
    }),
    deletePayment: builder.mutation<void, DeleteRecord>({
      query: (body) => ({
        url: `payments/${body.id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Payment", "Unit"],
    }),
  }),
});
export const {
  useAddPaymentMutation,
  useEditPaymentMutation,
  useFetchPaymentsQuery,
  useDeletePaymentMutation,
  useFetchPaymentQuery,
} = paymentApi;
