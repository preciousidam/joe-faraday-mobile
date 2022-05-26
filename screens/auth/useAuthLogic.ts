import React, {useState} from "react";
import { Alert } from "react-native";
import { setCredential } from "../../store/auth";
import { useLoginMutation } from "../../store/auth/api";
import { User, Response, Error } from "../../store/auth/types";
import { useAppDispatch } from "../../store/hook";

type ReturnProp = {
  login: () => void;
  form: State;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  canSubmit: () => boolean;
  errors?: ProcessError;
  loading: boolean;
};

type State = {
  email: string;
  password: string;
};

type Catch = {
	data: Response
};

type ProcessError = {
  email?: string;
  password?: string;
}

export const useAuthLogic = (): ReturnProp => {
  const [form, setForm] = useState<State>({email: '', password: ''});
  const [loginReq, {isLoading}] = useLoginMutation();
  const [errors, setErrors] = useState<ProcessError>({});
  const dispatch = useAppDispatch();

  const setEmail = (email: string) => {
    setForm(prev => ({...prev, email}));
  }

  const setPassword = (password: string) => {
    setForm(prev => ({...prev, password}));
  }

  const canSubmit = () => {
    return Boolean(form?.email) && Boolean(form?.password) && !isLoading;
  }

  const login = async () => {
    try {
      const data = await loginReq(form).unwrap()
      dispatch(setCredential({
        isLoading: false,
        authentication_token: (data.response as User)?.user?.authentication_token,
        csrf_token: (data.response as User)?.csrf_token
      }));
    }
    catch (err) {
      let errs = ((err as Catch).data.response as Error);

			if(errs.error){
				Alert.alert(errs.error);
			}else if(errs.errors){
				if(errs.errors.email){
					let err = errs.errors.email[0]
					setErrors(prev => ({...prev, email: err}));
				}
				if(errs.errors.password){
					let err = errs.errors.password[0]
					setErrors(prev => ({...prev, password: err}));
				}
			}
    }
    finally{
      setTimeout(() => {
        setErrors({});
      }, 3000);
    }
  }

  return {
    login,
    form,
    setEmail,
    setPassword,
    canSubmit,
    errors,
    loading: isLoading
  }
}