import React from "react";
import styled from "@emotion/native";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { PasswordInput, TextInput } from "../../components/input";
import { Button } from "../../components/button";

export const FullView = styled.View(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors.card,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Brand = styled.Image({
  width: widthPixel(50),
  height: widthPixel(50),
});

export const BrandContiner = styled.View({
  position: 'relative',
  flexDirection: "row",
  marginVertical: heightPixel(20)
});

export const InputView = styled.View({
  width: '100%',
  paddingHorizontal: widthPixel(20),
  paddingVertical: heightPixel(20)
});

export const Email = styled(TextInput)({
  marginVertical: heightPixel(10)
})

export const Password = styled(PasswordInput)({
  marginVertical: heightPixel(10)
});

export const LoginButton = styled(Button)({
  marginVertical: heightPixel(15)
})