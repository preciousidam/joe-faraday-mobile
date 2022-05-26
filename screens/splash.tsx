import React, { useEffect } from "react";
import styled from "@emotion/native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import { setCredential } from "../store/auth";
import { useAppDispatch } from "../store/hook";
import { FONTS } from "../tokens/font";

const View = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: '#00B096',
  justifyContent: 'center',
  alignItems: 'center'
});

const Logo = styled.Text([FONTS.brand, {
  color: '#ffffff',
  textTransform: 'uppercase'
}]);

type User = {csrf_token: string; authentication_token: string};

const SplashScreen: React.FC = () => {
  const {getItem} = useAsyncStorage("@faraday_user");
  const dispatch = useAppDispatch();

  const getUserDetail = async () => {
    const userString = await getItem();
    const user: User =userString ? JSON.parse(userString ?? '') : {};
    dispatch(setCredential({...user, isLoading: false}));
  }

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <View>
      <Logo>Cortts</Logo>
    </View>
  )
}

export default SplashScreen;