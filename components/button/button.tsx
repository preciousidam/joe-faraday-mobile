import React from "react";
import styled from "@emotion/native";
import { heightPixel, widthPixel } from "../../util/pxToDpConvert";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { FONTS } from "../../tokens/font";

const Filled = styled.TouchableOpacity(({theme, disabled}) => [{
  backgroundColor: disabled ? theme.colors.border : theme.colors.primary,
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(10),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'transparent',
  borderRadius: widthPixel(10)
}]);

const Outlined = styled.TouchableOpacity(({theme, disabled}) => [{
  backgroundColor: 'transparent',
  paddingHorizontal: widthPixel(15),
  paddingVertical: heightPixel(10),
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: disabled ? theme.colors.border : theme.colors.primary,
  borderRadius: widthPixel(10)
}]);

const Text = styled.Text<{variant: 'filled' | 'outlined', disabled?: boolean}>(({theme, variant, disabled}) => [FONTS.button, {
  color: variant == 'filled' ?'#ffffff' : disabled ? '#c4c4c4' : theme.colors.primary,
}])

type Prop = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outlined'
} & TouchableOpacityProps;

const getComp = (variant: 'filled' | 'outlined') => {
  switch(variant){
    case 'filled':
      return Filled;
    case 'outlined':
      return Outlined
  }
}

export const Button: React.FC<Prop> = ({text , isLoading, disabled, variant = 'filled',...rest}) => {
  const Component = getComp(variant);
  return (
    <Component {...rest} disabled={disabled ?? isLoading}>
      {
        !isLoading ? <Text variant={variant} disabled={disabled ?? isLoading}>{text}</Text> :
        <ActivityIndicator animating={isLoading} size='small' />
      }
    </Component>
  );
}