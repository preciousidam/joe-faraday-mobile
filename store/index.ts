import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/api";
import authReducer from "./auth";
import { clientApi } from "./client/api";
import { propertyApi } from "./property/api";
import { unitApi } from "./unit/api";
import { paymentApi } from "./payment/api";
import { agentApi } from "./agent/api";
import { teamApi } from "./team/api";
import { userApi } from "./user/api";
import { dashboardApi } from "./dashboard/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [unitApi.reducerPath]: unitApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(clientApi.middleware)
      .concat(propertyApi.middleware)
      .concat(unitApi.middleware)
      .concat(paymentApi.middleware)
      .concat(agentApi.middleware)
      .concat(teamApi.middleware)
      .concat(userApi.middleware)
      .concat(dashboardApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
