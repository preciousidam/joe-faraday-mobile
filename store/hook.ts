import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";
import { useSelectCurrentUser } from "./auth";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const { csrf_token, authentication_token, isLoading } = useAppSelector(useSelectCurrentUser);
  return {
    csrf_token,
    authentication_token,
    isLoading
  };
};

export const useRole = () => {
  const { user, authentication_token } = useAppSelector(useSelectCurrentUser);
  const isAdmin = user?.roles[0].name == "admin";
  return {
    roles: user?.roles,
    isAdmin,
  };
};
