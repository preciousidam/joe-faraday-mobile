import React, { useState } from "react";
import styled from "@emotion/native";
import { TextInputProps } from "react-native";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { FONTS } from "../../tokens/font";
import { numberWithCommas, sanitizeCurrency } from "../../util/numberFormatter";
import { NAIRA } from "../../util/naira";

export type InputProps = {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
} & Omit<TextInputProps, 'onChange' | 'onChangeText'>;

const View = styled.View({
  flexDirection: 'column'
})

const Label = styled.Text(({theme}) => [FONTS.label, {
  marginBottom: heightPixel(10),
  color: theme.colors.text
}]);

const Error = styled.Text(({theme}) => [FONTS.error, {
  marginBottom: heightPixel(10),
  color: theme.colors.notification
}]);

const Naira = styled.Text(({theme}) => [FONTS.input, {color: theme.colors.text}]);

const Input = styled.TextInput<{isFocused?: boolean}>(({theme, isFocused}) => ([ FONTS.input,{
  borderWidth: 1,
  borderColor: !isFocused ? theme.colors.border : theme.colors.primary,
  width: '100%',
  paddingHorizontal: widthPixel(10),
  paddingVertical: heightPixel(15),
  borderRadius: widthPixel(10),
  color: theme.colors.text
}]));

export const CurrencyInput: React.FC<InputProps> = ({label, error, value, onChange, ...rest}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const onInputChange = (text: string) => {
    if(onChange){
      onChange(sanitizeCurrency(text));
    }
  }

  return (
    <View>
      {label && <Label>{label}</Label>}
      <Input
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur= {() => setIsFocused(false)}
        {...rest}
        value={`${NAIRA} ${numberWithCommas(value ?? 0)}`}
        keyboardType='numbers-and-punctuation'
        onChangeText={onInputChange}
      />
      {error && <Error>{error}</Error>}
    </View>
  )
}