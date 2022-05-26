import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { User, Auth } from "./types";

const initialState: Auth = { isLoading: true } as Auth;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential(state, { payload: { csrf_token, authentication_token, user } }: PayloadAction<Auth>) {
      const {setItem} = useAsyncStorage("@faraday_user")
      state.authentication_token = authentication_token;
      state.csrf_token = authentication_token;
      state.isLoading = false;
      state.user = user;

      setItem(JSON.stringify({ csrf_token, authentication_token }));
    },
  },
});

export const { setCredential } = authSlice.actions;
export default authSlice.reducer;
export const useSelectCurrentUser = (state: RootState): Auth => state.auth;
export const useIsLoading = (state: RootState): boolean | undefined => state.auth.isLoading;
