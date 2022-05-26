import React from "react";
import { LinkButton } from "../../components/button";
import CustomKeyboardAvoidingView from "../../components/keyboardAvoidingView";
import { Brand, BrandContiner, Email, FullView, InputView, Password, LoginButton } from "./components";
import { useAuthLogic } from "./useAuthLogic";

export const LoginScreen = () => {
  const {form, canSubmit, setEmail, setPassword, errors, login, loading} = useAuthLogic();
  return (
    <CustomKeyboardAvoidingView>
      <FullView>
        <BrandContiner>
          <Brand source={require('../../assets/cortts1.png')} />
          <Brand source={require('../../assets/faraday.jpg')} />
        </BrandContiner>
        <InputView>
          <Email
            placeholder="Email address"
            keyboardType='email-address'
            textContentType='emailAddress'
            value={form?.email}
            onChangeText={setEmail}
            error={errors?.email}
          />
          <Password
            placeholder="Password"
            textContentType='password'
            value={form?.password}
            onChangeText={setPassword}
            error={errors?.password}
          />
          <LoginButton
            text="Login"
            variant='filled'
            disabled={!canSubmit()}
            onPress={login}
            isLoading={loading}
          />
          <LinkButton text="Forgot password" variant="default" />
        </InputView>
      </FullView>
    </CustomKeyboardAvoidingView>
  )
}